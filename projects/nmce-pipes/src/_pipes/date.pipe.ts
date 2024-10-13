import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import moment, { Moment, MomentInput } from 'moment';

/**
 * Date to Today, Tomorrow, Yesterday, dddd,MMMMDoYYYY
 * Limitations: Today and Tomorrow are not translated automatically through locale, and you may need to use app level localization.
 */
@Pipe({ name: 'literalDate' })
export class LiteralDatePipe implements PipeTransform {
	constructor(@Inject(LOCALE_ID) private locale: string) {
	}
	/**
	 *
	 * @param value
	 * @param nullText what text to shown if the date is not defined or too small.
	 */
	transform(value: Date | string | number | undefined | null, nullText?: string): string {
		if (!value && value !== 0) {
			return nullText ? nullText : '';
		}

		let date: Date;

		if (typeof value === 'string') {
			const n = Number.parseInt(value);
			if (n < 1000) {
				return nullText ? nullText : '';
			}

			if (Number.isNaN(n)) {
				return value;
			}

			date = new Date(n);
		} else if (typeof value === 'number') {
			try {
				date = new Date(value);
			} catch (e) {
				return value.toString();
			}
		}
		else {
			date = value;
		}

		try {
			return moment(date).locale(this.locale).calendar(null, {
				sameDay: '[Today]', //Moment does not provide translate for this, but something hardcoded like '[今天]LT', for i18n/localization, use your own dictionary.
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

//date pipes of ng2 and 4 not working in Firefox on Android, also,
//These pipes were developed when ng date pipe was still poor. Now ng date pipe is fairly good, so these home-made pipes will be obsolete soon.

/**
 * For displaying utc2local time in hh:mm a/pm format.
 * @deprecated use shortTime of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
 */
@Pipe({ name: 'shortTime' })
export class ShortTimePipe extends DatePipe {
	transform(value: Date | string | number | undefined | null): any {
		return super.transform(value, 'short');
	}
}

/**
 * For displaying utc2local time in 24-hour format.
 */
@Pipe({ name: 'short24' })
export class Short24Pipe extends DatePipe {
	transform(value: Date | string | number | undefined | null): any {
		return super.transform(value, 'HH:mm');
	}
}

/**
 * For 2-way transformation of DD/MM/YYYY
 * @deprecated use shortDate of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
 */
@Pipe({ name: 'shortDate' })
export class ShortDatePipe extends DatePipe {
	transform(value: Date | string | number | undefined | null): any { //thanks to https://stackoverflow.com/questions/64806103/extending-angular-datepipe-errors-in-angular-11-worked-in-angular-10
		return super.transform(value, 'dd/MM/yyyy');
	}
}


/**
 * For 2-way transformation of local DD/MM/YYYY hh:mm a
 * @deprecated use short of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
 */
@Pipe({ name: 'shortDateTime' })
export class ShortDateTimePipe implements PipeTransform {
	transform(value: Date | string | number | undefined | null): string {
		if (!value) {
			return '';
		}

		return moment(value).format('DD/MM/YYYY hh:mm a');
	}

	parse(value: string | undefined | null): Date | null {
		if (!value) {
			return null;
		}

		return moment(value, 'DD/MM/YYYY hh:mm a').toDate();
	}
}

/**
 * For 2-way transformation of local DD/MM/YYYY HH:mm
 * @deprecated use Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
 */
@Pipe({ name: 'shortDate24' })
export class ShortDate24Pipe implements PipeTransform {
	transform(value: Date | string | number | undefined | null): string {
		if (!value) {
			return '';
		}

		return moment(value).format('DD/MM/YYYY HH:mm');
	}

	parse(value: string | undefined | null): Date | null {
		if (!value) {
			return null;
		}

		return moment(value, 'DD/MM/YYYY HH:mm').toDate();
	}
}

/**
 * Date to LLL
 * @deprecated
 */
@Pipe({ name: 'mediumDate' })
export class MediumDatePipe implements PipeTransform {
	transform(value: Date | string | number | undefined | null): string {
		if (!value) {
			return '';
		}

		return moment(value).format('LLL');
	}
}

/**
 * Date to dddd, MMMM Do YYYY. Obsolete, to be replaced by Angular pipe date:'fullDate'
 * @deprecated
 */
@Pipe({ name: 'fullDate' })
export class FullDatePipe implements PipeTransform {
	transform(value: Date | string | number | undefined | null): string {
		if (!value) {
			return '';
		}

		return moment(value).format('dddd, MMMM Do YYYY');
	}
}
