import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateTime, Duration, Settings } from 'luxon';
import { DateFunc } from 'nmce-func';

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
	transform(value: Date | string | number | undefined | null, nullText?: string): string | null {
		if (!value && value !== 0) {
			return nullText ? nullText : '';
		}

		const dt = DateFunc.dateDataToDate(value);
		const dayAge = DateFunc.getDayAge(dt);
		const dateTime = DateTime.fromJSDate(dt);
		console.debug('dayAge: ' + dayAge);
		if ([0, 1, -1].includes(Math.round(dayAge))){
			return dateTime.toRelativeCalendar();
		}

		return dateTime.toLocaleString(DateTime.DATE_HUGE);
	}
}

//date pipes of ng2 and 4 not working in Firefox on Android, also,
//These pipes were developed when ng date pipe was still poor. Now ng date pipe is fairly good, so these home-made pipes will be obsolete soon.

// /**
//  * For displaying utc2local time in hh:mm a/pm format.
//  * @deprecated use shortTime of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
//  */
// @Pipe({ name: 'shortTime' })
// export class ShortTimePipe extends DatePipe {
// 	transform(value: Date | string | number | undefined | null): any {
// 		return super.transform(value, 'short');
// 	}
// }

// /**
//  * For displaying utc2local time in 24-hour format.
//  */
// @Pipe({ name: 'short24' })
// export class Short24Pipe extends DatePipe {
// 	transform(value: Date | string | number | undefined | null): any {
// 		return super.transform(value, 'HH:mm');
// 	}
// }

// /**
//  * For 2-way transformation of DD/MM/YYYY
//  * @deprecated use shortDate of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
//  */
// @Pipe({ name: 'shortDate' })
// export class ShortDatePipe extends DatePipe {
// 	transform(value: Date | string | number | undefined | null): any { //thanks to https://stackoverflow.com/questions/64806103/extending-angular-datepipe-errors-in-angular-11-worked-in-angular-10
// 		return super.transform(value, 'dd/MM/yyyy');
// 	}
// }


// /**
//  * For 2-way transformation of local DD/MM/YYYY hh:mm a
//  * @deprecated use short of Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
//  */
// @Pipe({ name: 'shortDateTime' })
// export class ShortDateTimePipe implements PipeTransform {
// 	transform(value: Date | string | number | undefined | null): string {
// 		const dt = DateFunc.dateDataToDateOrNull(value);
// 		if (!dt) {
// 			return '';
// 		}

// 		return DateTime.fromJSDate(dt).toFormat('dd/MM/yyyy hh:mm a');
// 	}
// }

// /**
//  * For 2-way transformation of local DD/MM/YYYY HH:mm
//  * @deprecated use Angular DatePipe which takes dateFormat and timezone, and DATE_PIPE_DEFAULT_OPTIONS, or declare dateFormat format in pipe parameters via constant or variable
//  */
// @Pipe({ name: 'shortDate24' })
// export class ShortDate24Pipe implements PipeTransform {
// 	transform(value: Date | string | number | undefined | null): string {
// 		const dt = DateFunc.dateDataToDateOrNull(value);
// 		if (!dt) {
// 			return '';
// 		}

// 		return DateFunc.getDateTime24Simple(dt)!;
// 	}
// }

// /**
//  * Date to LLL
//  * @deprecated
//  */
// @Pipe({ name: 'mediumDate' })
// export class MediumDatePipe implements PipeTransform {
// 	transform(value: Date | string | number | undefined | null): string {
// 		if (!value) {
// 			return '';
// 		}

// 		return moment(value).format('LLL');
// 	}
// }

// /**
//  * Date to dddd, MMMM Do YYYY. Obsolete, to be replaced by Angular pipe date:'fullDate'
//  * @deprecated
//  */
// @Pipe({ name: 'fullDate' })
// export class FullDatePipe implements PipeTransform {
// 	transform(value: Date | string | number | undefined | null): string {
// 		if (!value) {
// 			return '';
// 		}

// 		return moment(value).format('dddd, MMMM Do YYYY');
// 	}
// }
