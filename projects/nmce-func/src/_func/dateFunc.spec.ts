import moment from 'moment';
import { DateFunc } from './dateFunc';
import { DateTime } from 'luxon';


describe('DateFunc', () => {
	it('dateTimeUtcToLocalDateNumber', () => {
		const dtUtc = new Date('2018-01-23T22:00:00Z');
		expect(dtUtc.getDate()).toBe(24);
		expect(dtUtc.getUTCDate()).toBe(23);
		expect(dtUtc.getUTCHours()).toBe(22);
		expect(dtUtc.getHours()).toBe(8);

		const n = DateFunc.dateTimeUtcToLocalDateNumber(dtUtc);
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

		const localDt = DateFunc.dateTimeUtcToLocalDate(dtUtc);
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

	it('localDateToUtcWithDate', () => {
		const dt = new Date('2018-02-23T23:00:00Z');
		console.debug('localDateToUtc dt: ' + dt.toString());
		const m = DateTime.fromJSDate(dt);
		expect(m.hour).toBe(9);
		expect(dt.getDate()).toBe(24);
		expect(dt.getHours()).toBe(9); 

		const dtUtc = DateFunc.localDateToUtc('2018-02-23T23:00:00Z')!;
		expect(dtUtc).toBeDefined();
		console.debug('localDateToUtc dtUtc: ' + dtUtc.toString());
		expect(dtUtc.getHours()).toBe(14);
		expect(dtUtc.getDate()).toBe(24);
	});

	it('mod to near 5', () => {
		function near5(mt: number) {
			return (mt % 5) ? (Math.floor(mt / 5) * 5 + 5) : mt;
		}

		expect(near5(40)).toBe(40);
		expect(near5(37)).toBe(40);
	});

	it('older than 33 hours with 33 hours', () => {
		const m = moment().add(-33, 'hour');
		expect(DateFunc.olderThanHours(m.toDate(), 33)).toBeTruthy();
	});

	it('older than 33 hours with 333 hours', () => {
		const m = moment().add(-333, 'hour');
		expect(DateFunc.olderThanHours(m.toDate(), 33)).toBeTruthy();
	});

	it('not older than 33 hours with 2 hours', () => {
		const m = moment().add(-2, 'hour');
		expect(DateFunc.olderThanHours(m.toDate(), 33)).toBeFalsy();
	});

	it('older than 1 day 24 hours', () => {
		const m = moment().add(-24, 'hour');
		expect(DateFunc.olderThan24Hours(m.toDate())).toBeTruthy();
	});

	it('older than 1 day with 333 hours', () => {
		const m = moment().add(-333, 'hour');
		expect(DateFunc.olderThan24Hours(m.toDate())).toBeTruthy();
	});

	it('not older than 1 day with 23 hours', () => {
		const m = moment().add(-23, 'hour');
		expect(DateFunc.olderThan24Hours(m.toDate())).toBeFalsy();
	});

	it('not older than 1 day with undefined', () => {
		expect(DateFunc.olderThan24Hours(undefined)).toBeFalsy();
	});


	//UTC counter parts
	it('older than 1 day 24 hours utc', () => {
		const m = moment.utc().add(-24, 'hour');
		expect(DateFunc.olderThan24HoursUtc(m.toDate())).toBeTruthy();
	});

	it('older than 1 day with 333 hours utc', () => {
		const m = moment.utc().add(-333, 'hour');
		expect(DateFunc.olderThan24HoursUtc(m.toDate())).toBeTruthy();
	});

	it('not older than 1 day with 23 hours utc', () => {
		const m = moment.utc().add(-23, 'hour');
		expect(DateFunc.olderThan24HoursUtc(m.toDate())).toBeFalsy();
	});


	it('older than 33 hours with 33 hours Utc', () => {
		const m = moment.utc().add(-33, 'hour');
		expect(DateFunc.olderThanHoursUtc(m.toDate(), 33)).toBeTruthy();
	});

	it('older than 33 hours with 333 hours Utc', () => {
		const m = moment.utc().add(-333, 'hour');
		expect(DateFunc.olderThanHoursUtc(m.toDate(), 33)).toBeTruthy();
	});

	it('not older than 33 hours with 2 hours Utc', () => {
		const m = moment.utc().add(-2, 'hour');
		expect(DateFunc.olderThanHoursUtc(m.toDate(), 33)).toBeFalsy();
	});

	it('olderThan1Day', () => {
		const hour = moment().hour();
		const yesterday = moment().add(-hour - 1, 'hours').toDate();
		const yesterdayUtc = DateFunc.localDateToUtc(yesterday);
		console.debug(`olderThan1Day: hour: ${hour}; yesterday: ${yesterday}, yesterDayUtc: ${yesterdayUtc}`);
		expect(DateFunc.olderThan1Day(yesterdayUtc)).toBeTruthy();


	});

	it('notOlderThan1DayEnough', () => {
		const hour = moment(Date.now()).hour();
		const yesterday = moment().add(-hour - 1, 'hours').toDate();
		const yesterdayUtc = DateFunc.localDateToUtc(yesterday);
		console.debug(`notOlderThan1DayEnough: hour: ${hour}; yesterday: ${yesterday}, yesterDayUtc: ${yesterdayUtc}`);
		if (yesterdayUtc){
		expect(DateFunc.olderThan1Day(new Date(yesterdayUtc))).toBeTruthy();}
	});

	it('getTimeFromMins', () => {
		const v = DateFunc.getHMFromMins(120);
		expect(v).toBe('02:00');

		const v2 = DateFunc.getHMFromMins(780);
		expect(v2).toBe('13:00');
	});

	it('getMinutesSinceMidnight', () => {
		const m = moment('20180102T130000');
		const d = m.toDate();
		console.debug('getMinutesSinceMidnight: ' + d.toString());
		const v = DateFunc.getMinutesSinceMidnight(d);
		expect(v).toBe(780);
	});

	it('firstDayOfWeek en-AU', () => {
		const d = moment.localeData('en-AU');
		expect(d.firstDayOfWeek()).toBe(0); // the lib previously return 1, but now 0. https://www.abc.net.au/news/2019-08-18/which-day-do-you-consider-the-start-of-the-week/11346348
		//https://thetylt.com/culture/sunday-first-or-last-day-of-the-week, apparently the balance of the debate inside the lib dev team had been changing.
	});

	it('firstDayOfWeek en-GB', () => {
		const d = moment.localeData('en-GB');
		expect(d.firstDayOfWeek()).toBe(1);
	});

	it('firstDayOfWeek en-US', () => {
		const d = moment.localeData('en-US');
		expect(d.firstDayOfWeek()).toBe(0);
	});


});
