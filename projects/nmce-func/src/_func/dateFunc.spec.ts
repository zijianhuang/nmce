import { DateFunc } from './dateFunc';
import { DateTime, Settings } from 'luxon';

Settings.defaultZone='Australia/Brisbane';

describe('DateFunc', () => {
	it('getDefaultZone', () => {
		const d = DateFunc.getDefaultZone();
		expect(d).toBe('Australia/Brisbane');
		expect(DateFunc.isZoneValid()).toBe(true);

		DateFunc.setDefaultZone('abc/efg');
		expect(DateFunc.isZoneValid()).toBe(false);

		DateFunc.setDefaultZone(d);
	});

	it('dateTimeUtcToLocalDateNumber', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');
		expect(dtUtc.getDate()).toBe(24);
		expect(dtUtc.getUTCDate()).toBe(23);
		expect(dtUtc.getUTCHours()).toBe(22);
		expect(dtUtc.getHours()).toBe(8);

		const n = DateFunc.dateTimeUtcToLocalDateNumber(dtUtc)!;
		const dt = new Date(n);
		expect(dt.getDate()).toBe(24);
		expect(dt.getUTCDate()).toBe(23);
		expect(dt.getHours()).toBe(0);
		expect(dt.getUTCHours()).toBe(14);
		expect(dt.getMinutes()).toBe(0);
		expect(JSON.stringify(dt)).toBe('"2018-01-23T14:00:00.000Z"');
	});

	it('dateTimeUtcToLocalDate', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');
		expect(dtUtc.getDate()).toBe(24);
		expect(dtUtc.getUTCDate()).toBe(23);
		expect(dtUtc.getUTCHours()).toBe(22);
		expect(dtUtc.getHours()).toBe(8);

		const localDt = DateFunc.dateTimeUtcToLocalDate(dtUtc)!;
		expect(localDt.getDate()).toBe(24);
		expect(localDt.getUTCDate()).toBe(23);
		expect(localDt.getUTCHours()).toBe(14);
		expect(localDt.getHours()).toBe(0);
		expect(JSON.stringify(localDt)).toBe('"2018-01-23T14:00:00.000Z"');
	});

	it('localISODateString', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');

		const localDt = DateFunc.localISODateString(dtUtc);
		expect(localDt).toBe('2018-01-24');
	});

	it('getDateTime24Simple', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');

		const currentLocale = DateFunc.getDefaultLocale();
		DateFunc.setDefaultLocale('en-au');
		const localDt = DateFunc.getDateTime24Simple(dtUtc);
		DateFunc.setDefaultLocale(currentLocale);
		expect(localDt).toBe('24/01/2018 08:00');
	});

	it('getDateTime24SimpleZh', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');

		const currentLocale = DateFunc.getDefaultLocale();
		DateFunc.setDefaultLocale('zh');
		const localDt = DateFunc.getDateTime24Simple(dtUtc);
		DateFunc.setDefaultLocale(currentLocale);
		expect(localDt).toBe('2018/1/24 08:00');
	});

	it('getDateTime24SimpleEnUs', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');

		const currentLocale = DateFunc.getDefaultLocale();
		DateFunc.setDefaultLocale('en-us');
		const localDt = DateFunc.getDateTime24Simple(dtUtc);
		DateFunc.setDefaultLocale(currentLocale);
		expect(localDt).toBe('1/24/2018 08:00');
	});

	it('getDateTime24SimpleEnAu', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');

		const currentLocale = DateFunc.getDefaultLocale();
		DateFunc.setDefaultLocale('en-au');
		const localDt = DateFunc.getDateTime24Simple(dtUtc);
		DateFunc.setDefaultLocale(currentLocale);
		expect(localDt).toBe('24/01/2018 08:00');
	});

	it('getEndOfWeek', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getEndOfWeek(dtUtc)!;
		expect(dt).toEqual(new Date('2024-03-03T13:59:59.999Z')); //Australia +10
	});

	it('getStartOfWeek', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getStartOfWeek(dtUtc)!;
		expect(dt).toEqual(new Date('2024-02-25T14:00:00Z')); //Australia +10
	});

	it('getEndOfMonth', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getEndOfMonth(dtUtc)!;
		expect(dt).toEqual(new Date('2024-02-29T13:59:59.999Z')); //Australia +10
	});

	it('getStartOfMonth', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getStartOfMonth(dtUtc)!;
		expect(dt).toEqual(new Date('2024-01-31T14:00:00Z')); //Australia +10
	});

	it('getEndOfDate', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getEndOfDate(dtUtc)!;
		expect(dt).toEqual(new Date('2024-02-27T13:59:59.999Z')); //Australia +10
	});

	it('getStartOfDate', () => {
		const dtUtc = new Date('2024-02-27');

		const dt = DateFunc.getStartOfDate(dtUtc)!;
		expect(dt).toEqual(new Date('2024-02-26T14:00:00Z')); //Australia +10
	});

	it('addDays', () => {
		const dtUtc = new Date('2024-03-01');
		console.debug('addDay: '+ dtUtc);
		const dt = DateFunc.addDays(dtUtc, 10)!;
		expect(dt).toEqual(new Date('2024-03-11T00:00:00Z'));
	});

	it('addDaysMinusLeapFeb', () => {
		const dtUtc = new Date('2024-03-01');
		console.debug('addDay: '+ dtUtc);
		const dt = DateFunc.addDays(dtUtc, -10)!;
		expect(dt).toEqual(new Date('2024-02-20T00:00:00Z'));
	});

	it('addDaysMinusFeb', () => {
		const dtUtc = new Date('2023-03-01');
		console.debug('addDay: '+ dtUtc);
		const dt = DateFunc.addDays(dtUtc, -10)!;
		expect(dt).toEqual(new Date('2023-02-19T00:00:00Z')); 
	});

	it('addDaysMinus', () => {
		const dtUtc = new Date('2023-03-17');
		console.debug('addDay: '+ dtUtc);
		const dt = DateFunc.addDays(dtUtc, -10)!;
		expect(dt).toEqual(new Date('2023-03-07T00:00:00Z')); 
	});

	it('addMonths', () => {
		const dtUtc = new Date('2024-01-29');
		console.debug('addMonths: '+ dtUtc);
		const dt = DateFunc.addMonths(dtUtc, 1)!;
		expect(dt).toEqual(new Date('2024-02-29T00:00:00Z'));
	});

	it('addMonthsFebEnd', () => {
		const dtUtc = new Date('2024-01-30');
		console.debug('addMonths: '+ dtUtc);
		const dt = DateFunc.addMonths(dtUtc, 1)!;
		expect(dt).toEqual(new Date('2024-02-29T00:00:00Z'));
	});

	it('addMonthsFebEnd2', () => {
		const dtUtc = new Date('2024-01-31');
		console.debug('addMonths: '+ dtUtc);
		const dt = DateFunc.addMonths(dtUtc, 1)!;
		expect(dt).toEqual(new Date('2024-02-29T00:00:00Z'));
	});

	it('getNext5MinuteMark', () => {
		const dt = DateFunc.getNext5MinuteMark();
		const dateTime = DateTime.fromJSDate(dt);
		expect(dateTime.minute % 5).toEqual(0); 
	});

	it('getYMD', () => {
		const dtUtc = new Date('2024-02-27T23:00:00Z');
		expect(DateFunc.getYMD(dtUtc)).toEqual('20240228');
		console.debug('Zone: ' + JSON.stringify(Settings.defaultZone));
	});

	it('getDMYWithSlash', () => {
		const dtUtc = new Date('2024-02-27T23:00:00Z');
		expect(DateFunc.getDMYWithSlash(dtUtc)).toEqual('28/02/2024');
	});

	it('getDMYHmWithSlash', () => {
		const dtUtc = new Date('2024-02-27T23:12:34Z');
		expect(DateFunc.getDMYHmWithSlash(dtUtc)).toEqual('28/02/2024 09:12');
	});

	it('getYMD', () => {
		const dtUtc = new Date('2024-02-27T23:00:00Z');
		expect(DateFunc.getYMD(dtUtc)).toEqual('20240228');
	});

	it('GetHM', () => {
		const dtUtc = new Date('2024-02-27T23:12:34Z');
		expect(DateFunc.getHour(dtUtc)).toEqual(9);
		expect(DateFunc.getMinute(dtUtc)).toEqual(12);
		expect(DateFunc.GetHM(dtUtc)).toEqual({h: 9, m: 12});
	});

	it('getHourAge', () => {
		const dt = DateTime.now().plus({hours: -3}).toJSDate();
		expect(DateFunc.getHourAge(dt)).toBeCloseTo(3, 5);

		const dt2 = DateTime.now().plus({hours: -3, minutes: -44}).toJSDate();
		expect(DateFunc.getHourAge(dt2)).toBeGreaterThan(3);

		const dt3 = DateTime.now().plus({hours: 3}).toJSDate();
		expect(DateFunc.getHourAge(dt3)).toBeCloseTo(-3, 5);
	});

	it('getDayAge', () => {
		const dt = DateTime.now().plus({days: -3}).toJSDate();
		expect(DateFunc.getDayAge(dt)).toBeCloseTo(3, 5); // could be 3.000000011574074
	});

	it('getDayAgeWithSecondsChanged', () => {
		const dt = DateTime.now().plus({seconds: -3*24*3600}).toJSDate();
		expect(DateFunc.getDayAge(dt)).toBeCloseTo(3, 5); // could be 3.000000011574074
	});

	it('getDayAgeWithMillisecondsChanged', () => {
		const dt2 = Date.now();
		const dayMilliseconds = 3*24*3600000;
		
		const dateTime = DateTime.fromJSDate(new Date(dt2 -dayMilliseconds)).toJSDate();
		expect(DateFunc.getDayAge(dateTime)).toBeCloseTo(3, 5); // could be 3.000000011574074
	});

	it('getAge', () => {
		const dt = DateTime.now().plus({years: -3}).toJSDate();
		expect(DateFunc.getAge(dt)).toBeCloseTo(3, 5);
	});

	it('composeDateTime', () => {
		const dtUtc = new Date('2024-02-27T23:00:00Z');
		const r = DateFunc.composeDateTime(dtUtc, 12, 34, 56);
		expect(r.getHours()).toEqual(12); //utc
		expect(r.getMinutes()).toEqual(34);
		expect(r.getSeconds()).toEqual(56);
	});

	it('getLocalTimezoneOffset', () => {
		const diff = DateFunc.getLocalTimezoneOffset();
		expect(diff).toBe(-600);
	});

	it('localDateToUtcWithDateOnly', () => {
		const dt = new Date('2018-02-23');
		console.debug('localDateToUtc dt: ' + dt.toString());
		//It might be interpreted as UTC date, that will become 2010-02-23 10:00:00 in +10 timezone so is 2010-02-23T0:0:0Z
		const m = DateTime.fromJSDate(dt);
		expect(m.hour).toBe(10);
		expect(dt.getDate()).toBe(23);
		expect(dt.getHours()).toBe(10);

		const dtUtc = DateFunc.localDateToUtc('2018-02-23')!;
		expect(dtUtc).toBeDefined();
		console.debug('localDateToUtc dtUtc: ' + dtUtc.toString());
		expect(dtUtc.getHours()).toBe(14);
		expect(dtUtc.getDate()).toBe(22);
	});

	it('localDateToUtcWithDateAndTime', () => {
		const dt = new Date('2018-02-23T23:00:00Z');
		console.debug('localDateToUtc dt: ' + dt.toString());
		const m = DateTime.fromJSDate(dt);
		expect(m.hour).toBe(9);
		expect(dt.getDate()).toBe(24);
		expect(dt.getHours()).toBe(9);

		const dtUtc = DateFunc.localDateToUtc('2018-02-23T23:00:00Z')!; //John is born  in 24 AEST time.
		expect(dtUtc).toBeDefined();
		console.debug('localDateToUtc dtUtc: ' + dtUtc.toString());
		expect(dtUtc.getHours()).toBe(14);
		expect(dtUtc.getDate()).toBe(23); // Will be recorded 23 UTC time.
	});

	it('mod to near 5', () => {
		function near5(mt: number) {
			return (mt % 5) ? (Math.floor(mt / 5) * 5 + 5) : mt;
		}

		expect(near5(40)).toBe(40);
		expect(near5(37)).toBe(40);
	});

	it('older than  33 hours', () => {
		const m = DateTime.now().plus({hours: -33}).toJSDate();
		expect(DateFunc.olderThanHours(m, 33)).toBe(true);
	});

	it('older than  333 hours', () => {
		const m = DateTime.now().plus({hours: -333}).toJSDate();
		expect(DateFunc.olderThanHours(m, 333)).toBe(true); //https://stackoverflow.com/questions/32615713/tobetrue-vs-tobetruthy-vs-tobetrue
	});

	it('not older than  2 hours', () => {
		const m = DateTime.now().plus({hours: -2}).toJSDate();
		expect(DateFunc.olderThanHours(m, 2)).toBe(true);
	});

	it('older than 1 day 24 hours', () => {
		const m = DateTime.now().plus({hours: -24}).toJSDate();
		expect(DateFunc.olderThan24Hours(m)).toBe(true);
	});

	it('older than 1 day with 333 hours', () => {
		const m = DateTime.now().plus({hours: -333});
		expect(DateFunc.olderThan24Hours(m.toJSDate())).toBe(true);
	});

	it('not older than 1 day with 23 hours', () => {
		const m = DateTime.now().plus({hours: -23});
		expect(DateFunc.olderThan24Hours(m.toJSDate())).toBe(false);
	});

	it('olderThan1Day', () => {
		const yesterday = DateTime.now().plus({hours: -24}).toJSDate();
		const yesterdayUtc = DateFunc.localDateToUtc(yesterday)!;
		expect(DateFunc.olderThan1Day(yesterdayUtc)).toBe(true);


	});

	it('getTimeFromMins', () => {
		const v = DateFunc.getHMFromMins(120);
		expect(v).toBe('02:00');

		const v2 = DateFunc.getHMFromMins(780);
		expect(v2).toBe('13:00');
	});

	it('getMinutesSinceMidnight', () => {
		const d = DateFunc.dateDataToDate('2018-01-02T13:00:00');
		console.debug('getMinutesSinceMidnight: ' + d.toString());
		const v = DateFunc.getMinutesSinceMidnight(d);
		expect(v).toBe(780);
	});

	it('getMinutesBetween', () => {
		const v = DateFunc.getMinutesBetween('2018-01-02T13:00:00Z', '2018-01-02T13:00:00Z');
		expect(v).toBe(0);
		const v2 = DateFunc.getMinutesBetween('2018-01-02T13:00:00Z', '2018-01-02T14:00:00Z');
		expect(v2).toBeCloseTo(60, 5);
		const v3 = DateFunc.getMinutesBetween('2018-01-02T13:00:00Z', '2018-01-02T14:00:30Z');
		expect(v3).toBeCloseTo(60.5, 5);
	});

	it('firstDayOfWeek en-AU', () => {
		DateFunc.setDefaultLocale('en-AU');
		expect(DateTime.now().startOf('week').weekday).toBe(1);
	});

	it('firstDayOfWeek en-GB', () => {
		DateFunc.setDefaultLocale('en-GB');
		expect(DateTime.now().startOf('week').weekday).toBe(1);
	});

	it('firstDayOfWeek en-US', () => {
		DateFunc.setDefaultLocale('en-US');
		expect(DateTime.now().startOf('week').weekday).toBe(1);
	});

	it('dateDataToDate', () => {
		expect(DateFunc.dateDataToDate('2018-01-02T13:00:00Z')).toEqual(new Date('2018-01-02T13:00:00Z')); // string
		expect(DateFunc.dateDataToDate(new Date('2018-01-02T13:00:00Z'))).toEqual(new Date('2018-01-02T13:00:00Z')); // Date
		expect(DateFunc.dateDataToDate(Date.parse('2018-01-02T13:00:00Z'))).toEqual(new Date('2018-01-02T13:00:00Z')); //number
	});

	it('dateDataToDateWithInvalid', () => {
		expect(()=> DateFunc.dateDataToDate('20180102T130000Z')).toThrowError(new RangeError(`Invalid string for Date`)) ;
		expect(()=> DateFunc.dateDataToDate(NaN)).toThrowError(new RangeError(`Invalid number for Date`)) ; //both RangeError and message are matched
		expect(()=> DateFunc.dateDataToDate(null!)).toThrowError(new TypeError(`Expect Date, string or number`)); //though the test case throws RangeError, vitest somehow get TypeError.
		expect(()=> DateFunc.dateDataToDate(undefined!)).toThrowError(new TypeError(`Expect Date, string or number`));

	});

	it('dateDataToDateOrNull', () => {
		expect(DateFunc.dateDataToDateOrNull(null)).toBeNull();
		expect(DateFunc.dateDataToDateOrNull(undefined)).toBeUndefined();
	});
});
