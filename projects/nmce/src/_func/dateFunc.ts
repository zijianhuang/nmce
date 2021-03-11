import * as moment_ from 'moment';
const moment = moment_;

export class DateFunc {

	/**
	 * Transform UTC DateTime to local date without H, M and S. For example, the month day of 2018-01-23T22:00:00Z is 24 in Australia.
	 * @param dtUtc
	 * @param offsetMinutes if not defined, it will be new Date().getTimezoneOffset(). //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
	 */
	static dateTimeUtcToLocalDateNumber(dtUtc: Date): number {
		if (!dtUtc) {
			return 0; //0 is better for calculation by the clients.
		}

		const localDt = DateFunc.dateTimeUtcToLocalDateTime(dtUtc);
		const localDNum = localDt.setHours(0, 0, 0, 0);

		return localDNum;
	}

	/**
	 * Date only. However, the date may still be in UTC.
	 * @param dtUtc
	 */
	static dateTimeUtcToLocalDate(dtUtc: Date): Date {
		if (!dtUtc) {
			return dtUtc;
		}

		const localDt = DateFunc.dateTimeUtcToLocalDateTime(dtUtc);
		const localD = localDt.setHours(0, 0, 0, 0);
		return new Date(localD);
	}

	static localISODateString(dtUtc: Date): string {
		const dt = moment(dtUtc).local();
		return dt.format('YYYY-MM-DD');
	}

	/**
	 * locate date ONLY (no time) to UTC date.
	 * @param dt if dt contain time info, it will become dt.setHours(0, 0, 0, 0)
	 */
	static localDateToUtc(d: Date | number | string): Date | undefined {
		if (!d) {
			return undefined;
		}

		const dt = moment(d).toDate();
		const n = dt.setHours(0, 0, 0, 0);
		const offset = dt.getTimezoneOffset() * 60000;
		return new Date(n + offset);
	}

	static getTimezoneOffset(): number {
		const dt = this.today;
		return dt.getTimezoneOffset();
	}

	/**
	 * Transform UTC DateTime to local dateTime.
	 * @param dtUtc
	 * @param offsetMinutes if not defined, it will be new Date().getTimezoneOffset(). //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
	 */
	static dateTimeUtcToLocalDateTime(dtUtc: Date): Date {
		if (!dtUtc) {
			return dtUtc;
		}

		const stillUtc = moment.utc(dtUtc).toDate();
		return moment(stillUtc).local().toDate();
	}

	static dateTimeUtcToLocaMoment(dtUtc: Date): moment.Moment {
		if (!dtUtc) {
			return dtUtc;
		}

		const stillUtc = moment.utc(dtUtc);
		return stillUtc.local();
	}

	static getEndOfWeek(dt: Date | number) {
		//  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 6 - dt.getDay(), 23, 59, 59, 999);
		return moment(dt).endOf('isoWeek').toDate();
	}

	static getStartOfWeek(dt: Date | number) {
		return moment(dt).startOf('isoWeek').toDate();
	}

	static getEndOfMonth(dt: Date | number) {
		//  return new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59, 999);
		return moment(dt).endOf('month').toDate();
	}

	static getStartOfMonth(dt: Date | number) {
		return moment(dt).startOf('month').toDate();
	}

	static getDaysBetweenDates(dt1: Date, dt2: Date) {
		//const timeDiff = Math.abs(dt2.getTime() - dt1.getTime());
		//return Math.trunc(timeDiff / (1000 * 3600 * 24));
		return this.getDaysBetween(dt1, dt2);
	}

	static getEndOfDate(dt: Date): Date {
		return new Date(dt.setHours(23, 59, 59, 999));
	}

	static getStartOfDate(dt: Date): Date {
		return moment(dt).startOf('day').toDate();
	}

	static getEndOfToday(): Date {
		//	return new Date((new Date(Date.now())).setHours(23, 59, 59, 999));
		return moment(Date.now()).endOf('day').toDate();

	}

	static getStartOfToday(): Date {
		//	return new Date((new Date(Date.now())).setHours(0, 0, 0, 0));
		return moment(Date.now()).startOf('day').toDate();
	}

	//inspired https://stackoverflow.com/questions/563406/add-days-to-javascript-date
	static addDays(dt: Date, days: number) {
		const dat = moment(dt);
		dat.add(days, 'days');
		return dat.toDate();
	}

	static subtractDays(dt: Date, days: number) {
		const dat = moment(dt);
		dat.subtract(days, 'days');
		return dat.toDate();
	}

	/**
	 * Start of today
	 */
	static get today(): Date {
		return this.getStartOfToday();
	}

	static get now(): Date {
		return new Date(Date.now());
	}

	static getNext5MinuteMark(): Date {
		const m = moment().set('second', 0).set('millisecond', 0);
		const minute = m.minute();
		const mod = minute % 5;
		if (mod) {
			const delta = 5 - mod;
			return m.add(delta, 'm').toDate();
		}

		return m.toDate();
	}

	static getYMD(d: Date) {
		return moment(d).format('YYYYMMDD');
	}

	static getDMYWithSlash(d: Date) {
		return moment(d).format('DD/MM/YYYY');
	}

	static getDMYHmWithSlash(d: Date) {
		return moment(d).format('DD/MM/YYYY HH:mm');
	}

	static getMcpTime(dt: Date) {
		return moment(dt).format('HH:mm:ss.SSSZ');
	}

	/**
	 * In 24 hour format
	 * @param dtUtc
	 */
	static getLocalDMYHmWithSlash(dtUtc: Date) {
		const d = DateFunc.dateTimeUtcToLocalDateTime(dtUtc);
		return moment(d).format('DD/MM/YYYY HH:mm');
	}

	/**
	 * Offset minutes comparing with today
	 */
	static getOffsetMinutes(dtUtc: Date | number): number {
		const dm1 = moment(dtUtc);
		const dm2 = moment(new Date().setHours(0, 0, 0, 0));
		return dm1.diff(dm2, 'minutes');
	}

	static getDaysBetween(d1: Date | number, d2: Date | number): number {
		const dm1 = moment(d1);
		const dm2 = moment(d2);
		return dm2.diff(dm1, 'days');
	}

	/**
	 * Get hour of the date. If Date is not defined, the hour will be current hour.
	 * @param dtUtc
	 */
	static getHour(dtUtc: Date | number): number {
		const m = moment(dtUtc);
		return m.hours();
	}

	static getMinute(dtUtc: Date | number): number {
		const m = moment(dtUtc);
		return m.minutes();
	}

	static composeDateTime(dt: Date, h: number, minute?: number): Date {
		if (!dt) {
			return dt;
		}

		const mt = moment(dt);
		return new Date(mt.toDate().setHours(h, minute, 0, 0));
	}

	static olderThan24Hours(d: Date): boolean {
		const m = moment(d);
		return moment().diff(m, 'hours') >= 24;
	}

	static olderThan24HoursUtc(dtUtc: Date): boolean {
		return DateFunc.getHourAgeUtc(dtUtc) >= 24;
	}

	static olderThanHours(d: Date, hours: number) {
		const m = moment(d);
		return moment().diff(m, 'hours') >= hours;
	}

	static olderThanHoursUtc(dtUtc: Date, hours: number): boolean {
		return DateFunc.getHourAgeUtc(dtUtc) >= hours;
	}

	static olderThanMinutes(d: Date, minutes: number) {
		const m = moment(d);
		return moment().diff(m, 'minutes') >= minutes;
	}

	/**
	 * It could be 11PM yesterday, and 1 AM today. Actually based on local today.
	 */
	static olderThan1Day(dtUtc: Date): boolean {
		return DateFunc.getDayAgeUtc(dtUtc) > 0;
	}

	static getHourAge(d: Date) {
		const m = moment(d);
		return moment().diff(m, 'hours');
	}

	static getHourAgeUtc(dtUtc: Date) {
		const m = moment.utc(dtUtc);
		return moment.utc().diff(m, 'hours');
	}

	/**
	 * Compare utc date with utc now.
	 * @param dtUtc
	 */
	static getDayAgeUtc(dtUtc: Date) {
		const m = moment.utc(dtUtc);
		return moment.utc().diff(m, 'days');
	}

	static getAge(d: Date) {
		const m = moment(d);
		return moment().diff(m, 'years');
	}

	static getYear(d: Date) {
		const m = moment(d);
		return m.year();
	}

	static getUtcNow(): Date {
		return moment.utc().toDate();
	}

	static addMinutes(d: Date, m: number): Date {
		return moment(d).add(m, 'm').toDate();
	}

	static addMonth(d: Date, m: number): Date {
		return moment(d).add(m, 'M').toDate();
	}

	static getDuration(d1: Date, d2: Date) {
		const md1 = moment(d1);
		const md2 = moment(d2);
		return moment.duration(md2.diff(md1));
	}

	/**
	 * Convert minutes from midnight to HH:mm text
	 * @param mins
	 */
	static getHMFromMins(mins: number): string {
		// do not include the first validation check if you want, for example,
		// getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
		if (mins >= 24 * 60 || mins < 0) {
			throw new RangeError('Valid input should be greater than or equal to 0 and less than 1440.');
		}
		const h = mins / 60 | 0,
			m = mins % 60 | 0;
		return moment.utc().hours(h).minutes(m).format('HH:mm');
	}

	static getMinutesSinceMidnight(d: Date) {
		const m = moment(d);
		const midnight = moment(d).startOf('day'); //Mutates the original moment by setting it to the start of a unit of time. So I have better not to use m which wil be changed by calling this function
		return m.diff(midnight, 'minutes');
	}

	static getMinutesBetween(start: Date, end: Date) {
		const m = moment(start);
		const m2 = moment(end);
		return m2.diff(m, 'minutes');
	}

	/**
	 * Parse json string with date serialized into string, and get proper date object back
	 * @param s
	 */
	static dateSafeJsonParse(s: string) {
		return JSON.parse(s, this.dateReviver);
	}

	private static dateReviver(key: string, value: any) {
		if (DateFunc.isSerializedDate(value)) {
			return (new Date(value));
		}

		// If it's not a date-string, we want to return the value as-is. If we fail to return
		// a value, it will be omitted from the resultant data structure.
		return (value);

	}


	// I determine if the given value is a string that matches the serialized-date pattern.
	private static isSerializedDate(value: any): boolean {
		// Dates are serialized in TZ format, example: '1981-12-20T04:00:14.000Z'.
		const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
		return (DateFunc.isString(value) && datePattern.test(value));
	}


	// I determine if the given value is a String.
	private static isString(value: any): boolean {
		return ({}.toString.call(value) === '[object String]');
	}

	static dateSafeParse(s: string | Date) {
		const m = moment(s);
		return m.toDate();
	}

	static composeDateWithMinutes(d: Date, minute: number): Date {
		const m = moment(d);
		const midnight = moment(d).startOf('day'); // Mutates the original moment by setting it to the start of a unit of time. So I have better not to use m which wil be changed by calling this function
		midnight.add(minute, 'minutes');
		return midnight.toDate();
	}

	/**
	 * Safe compare since date data may be considered as string rather than date.
	 * @param d1
	 * @param d2
	 */
	static compare(d1: Date, d2: Date): number {
		const dd1 = (new Date(d1)).valueOf();
		const dd2 = (new Date(d2)).valueOf();
		return dd1 - dd2;
	}
}

