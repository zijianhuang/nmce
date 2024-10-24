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
