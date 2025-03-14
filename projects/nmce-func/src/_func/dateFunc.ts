import { DateTime, Duration, Settings } from 'luxon';

export class DateFunc {
	/**
	 * At runtime, there's no simple guarantee that the input is Date. Sometimes you codes expect date, but the response from the Web service may give you string or number.
	 * This function give you safe parse of date data from I/O, not of your control.
	 * If the data is invalid, throws RangeError or TypeError.
	 * @param dt 
	 * @returns 
	 */
	static dateDataToDate(dt: Date | string | number) : Date {
		if (dt instanceof Date){
			return dt;
		}

		if (typeof dt === 'string'){
			const r = Date.parse(dt);
			if (isNaN(r)){
				throw new RangeError(`Invalid string for Date`);
			}

			return new Date(r);
		}

		if (typeof dt === 'number'){
			const rd = new Date(dt)
			if (Number.isNaN(rd.valueOf())){
				throw new RangeError('Invalid number for Date');
			}

			return rd;
		}

		throw new TypeError('Expect Date, string or number');
	}

	/**
	 * Similar to dateDataToDate, but allow null and defined semantically.
	 * @param dt 
	 * @returns 
	 */
	static dateDataToDateOrNull(dt: Date | string | number | null | undefined) : Date | null | undefined {
		if (dt instanceof Date){
			return dt;
		}

		if (typeof dt === 'string'){
			const r = Date.parse(dt);
			if (isNaN(r)){
				throw new RangeError('Invalid string for Date');
			}

			return new Date(r);
		}

		if (typeof dt === 'number'){
			const rd = new Date(dt)
			if (Number.isNaN(rd.valueOf())){
				throw new RangeError('Invalid number for Date');
			}

			return rd;
		}

		if (dt == null){ 
			return dt;
		}

		throw new TypeError('Expect Date, string or number');
	}

	/**
	 * Transform UTC DateTime to local date without H, M and S. For example, the month day of 2018-01-23T22:00:00Z is 24 in Australia.
	 * @param dtUtc
	 */
	static dateTimeUtcToLocalDateNumber(dtUtc: Date | string | number | null | undefined): number | null | undefined {
		if (dtUtc == null) {
			return dtUtc;
		}

		const localDt = this.dateDataToDate(dtUtc);
		const localDNum = localDt.setHours(0, 0, 0, 0);

		return localDNum;
	}

	/**
	 * Date only. However, the date may still be in UTC.
	 * @param dtUtc
	 * @returns new Date object.
	 */
	static dateTimeUtcToLocalDate(dtUtc: Date | string | number | null | undefined): Date | null | undefined {
		if (dtUtc == null) {
			return dtUtc;
		}

		const localDt = this.dateDataToDate(dtUtc);
		const localNum = localDt.setHours(0, 0, 0, 0);
		return new Date(localNum);
	}

	/**
	 * '2018-01-23T22:00:00Z' will become '2018-01-24' in Australia.
	 * @param dtUtc 
	 * @returns  new Date object.
	 */
	static localISODateString(dtUtc: Date | string | number | null | undefined): string | null | undefined {		
	    const dt = this.dateTimeUtcToLocalDate(dtUtc);
		if (dt == null) {
			return dt;
		}

		const d= DateTime.fromJSDate(dt);
		return d.toISODate();
	}

	/**
	 * local date ONLY (no time) to UTC date.
	 * The input could be a string of yyyy-MM-dd, or a Date Object.
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	 * While the time value at the heart of a Date object is UTC, the basic methods to fetch the date and time 
	 * or its components all work in the local (i.e. host system) time zone and offset.
	 * @param dt if dt contain time info, it will become dt.setHours(0, 0, 0, 0)
	 */
	static localDateToUtc(d: Date | string | number | null | undefined | string): Date | null | undefined {
		if (d == null) {
			return d;
		}

		const dt = this.dateDataToDate(d);
		const n = dt.setHours(0, 0, 0, 0);
		const offset = dt.getTimezoneOffset() * 60000;
		return new Date(n + offset);
	}

	static getEndOfWeek(dt: Date | string | number) : Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.endOf('week').toJSDate();
	}

	static getStartOfWeek(dt: Date | string | number) : Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.startOf('week').toJSDate();
	}

	static getEndOfMonth(dt: Date | string | number) : Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.endOf('month').toJSDate();
	}

	static getStartOfMonth(dt: Date | string | number) : Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.startOf('month').toJSDate();
	}

	static getEndOfDate(dt: Date | string | number): Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.endOf('day').toJSDate();
	}

	static getStartOfDate(dt: Date | string | number): Date {
		const dateTime = DateTime.fromJSDate(this.dateDataToDate(dt));
		return dateTime.startOf('day').toJSDate();
	}

	static getEndOfToday(): Date | null | undefined {
		return this.getEndOfDate(Date.now());

	}

	static getStartOfToday(): Date {
		return this.getStartOfDate(Date.now());
	}

	static getDaysBetween(d1: Date | string | number, d2: Date | string | number): number {
		const dm1 = DateTime.fromJSDate(this.dateDataToDate(d1));
		const dm2 = DateTime.fromJSDate(this.dateDataToDate(d1));
		return dm2.diff(dm1, 'days').days;
	}

	//inspired https://stackoverflow.com/questions/563406/add-days-to-javascript-date
	static addDays(dt: Date | string | number, days: number) : Date {
		const dat = DateTime.fromJSDate(this.dateDataToDate(dt));
		const r = dat.plus({days: days});
		return r.toJSDate();
	}

	static addMonths(dt: Date | string | number, months: number) : Date {
		const dat = DateTime.fromJSDate(this.dateDataToDate(dt));
		const r = dat.plus({months: months});
		return r.toJSDate();
	}

	static addYears(dt: Date | string | number, years: number) : Date {
		const dat = DateTime.fromJSDate(this.dateDataToDate(dt));
		const r = dat.plus({years: years});
		return r.toJSDate();
	}

	static addHours(dt: Date | string | number, hours: number) : Date {
		const dat = DateTime.fromJSDate(this.dateDataToDate(dt));
		const r = dat.plus({hours: hours});
		return r.toJSDate();
	}

	static addMinutes(dt: Date | string | number, minutes: number) : Date {
		const dat = DateTime.fromJSDate(this.dateDataToDate(dt));
		const r = dat.plus({minutes: minutes});
		return r.toJSDate();
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

	/**
	 * From now, next 5 minute mark. For example 2:23:44 will be 2:25:00;
	 * @returns 
	 */
	static getNext5MinuteMark(): Date {
		const m = DateTime.now().set({second: 0, millisecond:0});
		const minute = m.minute;
		const mod = minute % 5;
		if (mod) {
			const delta = 5 - mod;
			return m.plus({minutes: delta}).toJSDate();
		}

		return m.toJSDate();
	}

	static getYMD(d: Date | string | number) {
		const dt = DateTime.fromJSDate(this.dateDataToDate(d));
		return dt.toFormat('yyyyMMdd');
	}

	static getDMYWithSlash(d: Date | string | number) {
		const dt = DateTime.fromJSDate(this.dateDataToDate(d));
		return dt.toFormat('dd/MM/yyyy');
	}

	static getDMYHmWithSlash(d: Date | string | number) {
		const dt = DateTime.fromJSDate(this.dateDataToDate(d));
		return dt.toFormat('dd/MM/yyyy HH:mm');
	}

	/**
	 * 
	 * @param dtUtc In 24 hour format, and the date separator depending on the system or Luxon default locale
	 * @returns 
	 */
	static getDateTime24Simple(dtUtc: Date | string | number | null | undefined) {
		if (dtUtc == null) {
			return dtUtc;
		}
		
		const d = this.dateDataToDate(dtUtc);
		const dt = DateTime.fromJSDate(d);
		return dt.toLocaleString(DateTime.DATE_SHORT) + ' ' + dt.toLocaleString(DateTime.TIME_24_SIMPLE);
	}

	static setDefaultLocale(locale: string){
		Settings.defaultLocale=locale;
	}

	static getDefaultLocale(){
		return Settings.defaultLocale;
	}

	static setDefaultZone(zone: string){
		Settings.defaultZone=zone;
	}

	static getDefaultZone() : string {
		return Settings.defaultZone.name;
	}

	static isZoneValid(): boolean{
		return Settings.defaultZone.isValid;
	}

	/**
	 * For example, in AEST, it is -600.
	 * @returns 
	 */
	static getLocalTimezoneOffset(): number {
		const dt = new Date(Date.now());
		return dt.getTimezoneOffset();
	}

	/**
	 * Get hour of the date. If Date is not defined, the hour will be current hour.
	 * @param dtUtc
	 */
	static getHour(dtUtc: Date | string | number): number {
		const dt = DateTime.fromJSDate(this.dateDataToDate(dtUtc));
		return dt.hour;
	}

	static getMinute(dtUtc: Date | string | number): number {
		const dt = DateTime.fromJSDate(this.dateDataToDate(dtUtc));
		return dt.minute;
	}

	static GetHM(dtUtc: Date | string | number): {h: number, m: number}{
		const dt = DateTime.fromJSDate(this.dateDataToDate(dtUtc));
		return {h: dt.hour, m: dt.minute};
	}

	static composeDateTime(dt: Date | string | number, h: number = 0, minute: number = 0, second: number = 0): Date {
		return new Date( this.dateDataToDate(dt).setHours(h, minute, second, 0));
	}

	static olderThan24Hours(d: Date | string | number): boolean {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		return DateTime.now().diff(m, 'hours') >= Duration.fromISO('PT24H');
	}

	static olderThanHours(d: Date | string | number, hours: number) : boolean {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		const diff = DateTime.now().diff(m, 'hours'); 
		const duration = Duration.fromISO(`PT${hours}H`);
		console.debug('diff: ' + diff.hours + '   duration: ' + duration.hours);
		return diff.hours >= duration.hours;
	}

	static olderThanMinutes(d: Date | string | number, minutes: number) {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		return DateTime.now().diff(m, 'minutes') >= Duration.fromMillis(minutes*60*1000);
	}

	/**
	 * It could be 11PM yesterday, and 1 AM today. Actually based on local today.
	 */
	static olderThan1Day(dtUtc: Date | string | number): boolean {
		return DateFunc.getDayAge(dtUtc) > 0;
	}

	static getHourAge(d: Date | string | number) {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		return DateTime.now().diff(m, 'hours').hours;
	}

	/**
	 * Compare date with now.
	 * @param dtUtc
	 */
	static getDayAge(d: Date | string | number) {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		return DateTime.now().diff(m, 'days').days;
	}

	/**
	 * How many years from now.
	 * @param d
	 * @returns
	 */
	static getAge(d: Date | string | number) {
		const m = DateTime.fromJSDate(this.dateDataToDate(d));
		return DateTime.now().diff(m, 'years').years;
	}

	/**
	 * Convert minutes from midnight to HH:mm text
	 * @param minutes
	 */
	static getHMFromMins(minutes: number): string {
		if (minutes >= 24 * 60 || minutes < 0) {
			throw new RangeError('Valid input should be greater than or equal to 0 and less than 1440.');
		}
		const h = minutes / 60 | 0,
			m = minutes % 60 | 0;
		return DateTime.utc().set({hour: h, minute: m}).toFormat('HH:mm');
	}

	static getMinutesSinceMidnight(d: Date | string | number) {
		const dt = DateTime.fromJSDate(this.dateDataToDate(d));
		const midnight = dt.startOf('day');
		return dt.diff(midnight, 'minutes').minutes;
	}

	static getMinutesBetween(start: Date | string | number, end: Date | string | number) {
		const m = DateTime.fromJSDate(this.dateDataToDate(start));
		const m2 = DateTime.fromJSDate(this.dateDataToDate(end));
		return m2.diff(m, 'minutes').minutes;
	}
}

