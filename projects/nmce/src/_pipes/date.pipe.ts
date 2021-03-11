import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { DateFunc } from '../_func';

//date pipes of ng2 and 4 not working in Firefox on Android, also,
//These pipes were developed when ng date pipe was still poor. Now ng date pipe is fairly good, so these home-made pipes will be obsolete soon.

/**
 * For displaying utc2local time in hh:mm a/pm format.
 */
@Pipe({ name: 'shortTime' })
export class ShortTimePipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return DateFunc.dateTimeUtcToLocaMoment(value).format('hh:mm a');
	}
}

/**
 * For displaying utc2local time in 24-hour format.
 */
@Pipe({ name: 'short24' })
export class Short24Pipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return DateFunc.dateTimeUtcToLocaMoment(value).format('HH:mm');
	}
}

/**
 * For 2-way transformation of DD/MM/YYYY
 */
@Pipe({ name: 'shortDate' })
export class ShortDatePipe extends DatePipe {
	transform(value: Date | string | number | undefined | null): any { //thanks to https://stackoverflow.com/questions/64806103/extending-angular-datepipe-errors-in-angular-11-worked-in-angular-10
		return super.transform(value, 'dd/MM/yyyy');
	}
 }


/**
 * For 2-way transformation of local DD/MM/YYYY hh:mm a
 */
@Pipe({ name: 'shortDateTime' })
export class ShortDateTimePipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return moment(value).format('DD/MM/YYYY hh:mm a');
	}

	parse(value: string): Date | null {
		if (!value) {
			return null;
		}

		return moment(value, 'DD/MM/YYYY hh:mm a').toDate();
	}
}

/**
 * For 2-way transformation of local DD/MM/YYYY HH:mm
 */
@Pipe({ name: 'shortDate24' })
export class ShortDate24Pipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return moment(value).format('DD/MM/YYYY HH:mm');
	}

	parse(value: string): Date | null {
		if (!value) {
			return null;
		}

		return moment(value, 'DD/MM/YYYY HH:mm').toDate();
	}
}

/**
 * Date to LLL
 */
@Pipe({ name: 'mediumDate' })
export class MediumDatePipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return moment(value).format('LLL');
	}
}

/**
 * Date to dddd, MMMM Do YYYY. Obsolete, to be replaced by Angular pipe date:'fullDate'
 */
@Pipe({ name: 'fullDate' })
export class FullDatePipe implements PipeTransform {
	transform(value: Date): string {
		if (!value) {
			return '';
		}

		return moment(value).format('dddd, MMMM Do YYYY');
	}
}

/**
 * Date to Today, Tomorrow, Yesterday, dddd,MMMMDoYYYY
 */
@Pipe({ name: 'literalDate' })
export class LiteralDatePipe implements PipeTransform {
	/**
	 *
	 * @param value
	 * @param nullText what text to shown if the date is not defined or too small.
	 */
	transform(value: Date | string, nullText?: string): string {
		if (!value) {
			return nullText ? nullText : '';
		}

		let date: Date;

		if (typeof value === 'string') {
			const n = Number.parseInt(value);
			if (n < 1000) {
				return nullText ? nullText : '';
			}

			date = new Date(n);
		} else {
			if (value.getTime() < 1000) {
				return nullText ? nullText : '';
			}

			date = value;
		}

		try {
			return moment(date).calendar(null, {
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				nextWeek: 'dddd, MMMM Do YYYY',
				lastDay: '[Yesterday]',
				lastWeek: 'dddd, MMMM Do YYYY',
				sameElse: 'dddd, MMMM Do YYYY'
			});

		} catch (e) {
			return '';
		}
	}
}

