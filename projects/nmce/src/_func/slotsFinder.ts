import { Observable } from 'rxjs';

import * as namespaces from '../../clientapi/WebApiNG2ClientAuto';
import APS_WebPos_Services_Client = namespaces.APS_WebPos_Services_Client;

import { DateFunc } from '../_func/dateFunc';

import { APP_DI_CONFIG } from '../app-config';

import { SlotFunc, AvailableSlotsEx } from '../settings/availabilityFunc';


/**
 * Propose time slots of a practitioner.
 */
export class SlotsFinder {
	constructor(private appointmentsService: namespaces.APS_WebPos_WebApi_Controllers_Client.Appointments,
		private availabilities: AvailableSlotsEx,
		private practitionerUserId: string,

	) {
		console.debug('availabilities: ' + JSON.stringify(availabilities));
	}

	/**
	 * Return proposed time slots. Id is the practitionerId
	 * @param startDate
	 * @param endDate
	 * @param slotCount
	 */
	findNextAvailableSlots(startDate: Date, endDate: Date, slotCount = 5): Observable<{ id: string, times: Date[] }> {
		const startDateUtc = DateFunc.localDateToUtc(startDate);
		const endDateUtc = DateFunc.localDateToUtc(endDate);
		const offsetMinutes = DateFunc.getOffsetMinutes(startDateUtc);
		const daysBetween = DateFunc.getDaysBetweenDates(startDateUtc, endDateUtc);

		console.debug(`Appointments for current user... minutes: ${offsetMinutes} days: ${daysBetween}`);

		return new Observable<{ id: string, times: Date[] }>(observer => {
			this.appointmentsService.getAppointmentSlotsNextDaysOfUser(this.practitionerUserId, offsetMinutes, daysBetween).subscribe(
				items => {
					console.debug('items: ' + items.length);
					items.forEach(t => {
						t.startUtc = new Date(t.startUtc);
						t.endUtc = new Date(t.endUtc);
					});

					const times = this.findSlots(startDate, endDate, items, slotCount);
					if (times.length > 0) {
						observer.next({ id: this.practitionerUserId, times: times });
						observer.complete();
					} else {
						observer.error('Not found');
						observer.complete();
					}
				},
				error => {
					observer.error(error);
					observer.complete();
				}
			);
		});

	}

	filterHourWithAvailabilities(d: Date): boolean {
		if (!this.availabilities || !this.availabilities.slots) {
			return true;
		}

		return SlotFunc.filterDate(d, this.availabilities.slots, this.availabilities.exceptions, true);
	}

	//#region Private Helper
	private findSlots(startDate: Date, endDate: Date, items: APS_WebPos_Services_Client.AppointmentSummary[], count: number) {
		const times: Date[] = [];
		let st = startDate;
		for (let i = 0; i < count; i++) {
			const d = this.findFirstSlot(st, endDate, items);
			if (d) {
				times.push(d);
				st = DateFunc.addMinutes(d, APP_DI_CONFIG.slotSpanMinute);
			} else {
				return times;
			}
		}

		return times;
	}

	private findFirstSlot(startDate: Date, endDate: Date, items: APS_WebPos_Services_Client.AppointmentSummary[]) {
		console.debug('findFirstSlot: ' + startDate);
		const gapInMinutes = DateFunc.getMinutesBetween(startDate, endDate);
		if (items && items.length > 0) {
			for (let i = 0; i < gapInMinutes; i++) {
				const proposedTime = new Date(DateFunc.addMinutes(startDate, i).setSeconds(0));
				if (this.filterHourWithAvailabilities(proposedTime) && this.hasSpace(proposedTime, items)) {
					return proposedTime;
				}
			}

			return null;
		} else {
			for (let i = 0; i < gapInMinutes; i++) {
				const proposedTime = new Date(DateFunc.addMinutes(startDate, i).setSeconds(0));
				if (this.filterHourWithAvailabilities(proposedTime)) {
					return proposedTime;
				}
			}

			return null;
		}
	}

	private hasSpace(proposedStart: Date, aps: APS_WebPos_Services_Client.AppointmentSummary[]) {
		const first = aps[0];
		const last = aps[aps.length - 1];
		const proposedEnd = this.getProposedEnd(proposedStart);
		const lastEnd = new Date(last.endUtc.setSeconds(0));
		const firstStart = new Date(first.startUtc.setSeconds(0));
		const firstEnd = new Date(first.endUtc.setSeconds(0));
		if (proposedEnd <= firstStart || proposedStart >= lastEnd) { // to be before the first or after the last.
			return true;
		} else if (((proposedStart >= firstStart && proposedStart < firstEnd) || (proposedEnd >= firstStart && proposedEnd < firstEnd)) && aps.length === 1) { // being overlaping with the only 1
			return false;
		}

		for (let i = 0; i < aps.length - 1; i++) {
			const apt = aps[i];
			const nextapt = aps[i + 1];
			const aptEnd = new Date(apt.endUtc.setSeconds(0));
			const nextAptStart = new Date(nextapt.startUtc.setSeconds(0));
			const gapBetween = DateFunc.getMinutesBetween(aptEnd, nextAptStart);
			const gapBefore = DateFunc.getMinutesBetween(proposedStart, nextAptStart);
			if (proposedStart >= aptEnd && proposedStart < nextAptStart && gapBetween >= APP_DI_CONFIG.slotSpanMinute && gapBefore >= APP_DI_CONFIG.slotSpanMinute) { // slot exists between 2 appointments
				return true;
			}
		}

		return false;
	}

	private getProposedEnd(proposedStart: Date) {
		return DateFunc.addMinutes(proposedStart, APP_DI_CONFIG.slotSpanMinute);
	}
	//#endregion
}

