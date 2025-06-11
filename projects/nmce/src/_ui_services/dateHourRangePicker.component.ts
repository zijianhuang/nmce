import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFunc, StringFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * Pick datetimes between.
 * If start date is not defined, it will be today from now.
 * If the end date is not defined, it will be 180 days from the start date.
 * todo: compare with what in NMC, and consider to make it obsolete
 */
@Component({
    selector: 'DateHourRangePicker, nmce-date-hour-range-picker',
    templateUrl: 'dateHourRangePicker.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: false
})
export class DateHourRangePickerComponent {
	title = $localize`Date Range`;

	startDate: Date;
	endDate: Date;

	hourSlots = Array.from(Array(24).keys()); // thanks to https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
	minuteSlots = Array.from({ length: 12 }, (v, k) => k++).map(t => 5 * t);

	selectedHourStart: number;
	selectedMinuteStart: number;
	selectedHourEnd: number;
	selectedMinuteEnd: number;

	constructor(public dialogRef: MatDialogRef<DateHourRangePickerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { start: Date, end: Date },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end'
	) {
		this.startDate = data.start ? data.start : DateFunc.now;
		this.endDate = DateFunc.getEndOfDate(data.end ? data.end : DateFunc.addDays(this.startDate, 180));

		this.selectedHourStart = DateFunc.getHour(this.startDate);
		const mt = DateFunc.getMinute(this.startDate);
		this.selectedMinuteStart = (mt % 5) ? (Math.floor(mt / 5) * 5 + 5) : mt;

		this.selectedHourEnd = DateFunc.getHour(this.endDate);
		const mt2 = DateFunc.getMinute(this.endDate);
		this.selectedMinuteEnd = (mt2 % 5) ? (Math.floor(mt2 / 5) * 5 + 5) : mt2;
		if (this.selectedMinuteEnd === 60) {
			this.selectedMinuteEnd = 59;
		}

		this.minuteSlots.push(59);
		console.debug('selectedMinuteEnd: ' + this.selectedMinuteEnd);
	}

	submit(): void {
		this.dialogRef.close({
			start: DateFunc.composeDateTime(this.startDate, this.selectedHourStart, this.selectedMinuteStart),
			end: DateFunc.composeDateTime(this.endDate, this.selectedHourEnd, this.selectedMinuteEnd)
		});
	}

	cancel(): void {
		this.dialogRef.close(undefined);
	}

	clear(): void {
		this.dialogRef.close(null);
	}

	pad0(n: number) {
		return StringFunc.pad(n, 2);
	}
}

/**
 * Picke datetimes between.
 */
@Injectable()
export class DateHourRangePickerService {
	private isHandsetPortrait: boolean;
	constructor(private dialog: MatDialog, breakpointObserver: BreakpointObserver) {
		breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe(
			r => {
				this.isHandsetPortrait = r.matches;
			}
		);
	}

	/**
	 * Pick dates between through DateHourRangePickerComponent.
	 * If start date is not defined, it will be today from now.
	 * If the end date is not defined, it will be 180 days from the start date.
	 */
	open(start: Date | undefined, end: Date | undefined): Observable<{ start: Date, end: Date }> {
		const modalRef = this.isHandsetPortrait ?
			this.dialog.open(DateHourRangePickerComponent, {
				disableClose: true,
				minWidth: '98vw',
				maxHeight: '95vh',
				data: {
					start: start,
					end: end
				}
			})
			: this.dialog.open(DateHourRangePickerComponent, {
				disableClose: true,
				data: {
					start: start,
					end: end
				}
			});
		return modalRef.afterClosed();
	}

}
