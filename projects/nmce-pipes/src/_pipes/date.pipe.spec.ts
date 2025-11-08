import { TestBed } from '@angular/core/testing';
import {   LiteralDatePipe, } from './date.pipe';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';

import { DateFunc } from 'nmce-func';


describe('DatePipeMinus10', () => {
	let datePipe: DatePipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DatePipe,
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: { timezone: '-1000', dateFormat: 'shortTime' } // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		datePipe = TestBed.inject(DatePipe);
	});

	it('transformCrossTimezones', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(datePipe.transform(dt)).toEqual('5:33 AM');

		const dt2 = Date.parse('2023-12-28T09:33:44Z');
		expect(datePipe.transform(dt2)).toEqual('11:33 PM');

		const datePipe2 = new DatePipe('en-au', '-1000', { dateFormat: 'HH:mm' });
		expect(datePipe2.transform(dt2)).toEqual('23:33');
	});
});

describe('literalDate', () => {
	let datePipe: LiteralDatePipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: LiteralDatePipe,
					useValue: new LiteralDatePipe('en-au')
				},
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: { locale: 'en-au' } // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		datePipe = TestBed.inject(LiteralDatePipe);
	});

	it('transform', () => {
		const defaultLocale = DateFunc.getDefaultLocale();
		DateFunc.setDefaultLocale('en-us');
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(datePipe.transform(dt)).toEqual('Friday, December 29, 2023');

		const dt2 = Date.now();
		expect(datePipe.transform(dt2)).toEqual('today');
		const dayMilliseconds = 24 * 3600000;
		expect(datePipe.transform(dt2 - dayMilliseconds)).toEqual('yesterday');
		expect(datePipe.transform(dt2 + dayMilliseconds)).toEqual('tomorrow');

		expect(datePipe.transform(0)).toEqual('Thursday, January 1, 1970'); // 1970
		expect(datePipe.transform(10)).toEqual('Thursday, January 1, 1970'); // 1970
		expect(datePipe.transform(-100000000000)).toEqual('Tuesday, November 1, 1966'); // Before 1970
		DateFunc.setDefaultLocale(defaultLocale);
	});

	it('invalidInputs', () => {
		expect(datePipe.transform(null, 'invalid')).toEqual('invalid');
		expect(datePipe.transform(null)).toEqual('');
		expect(datePipe.transform(undefined)).toEqual('');
		expect(datePipe.transform('')).toEqual('');
		expect(() => datePipe.transform('kkk')).toThrow(new RangeError('Invalid string for Date'));
	});
});

describe('literalDateChinese', () => {
	let datePipe: LiteralDatePipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: LiteralDatePipe,
					useValue: new LiteralDatePipe('zh_cn')
				},

				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: { locale: 'zh' } // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		datePipe = TestBed.inject(LiteralDatePipe);
	});

	it('transform', () => {
		const defaultLocale = DateFunc.getDefaultLocale();
		try {
			DateFunc.setDefaultLocale('zh-cn');
			const dt = Date.parse('2023-12-28T15:33:44Z');
			expect(datePipe.transform(dt)).toEqual('2023年12月29日星期五');

			const dt2 = Date.now();
			expect(datePipe.transform(dt2)).toEqual('今天');
			const dayMilliseconds = 24 * 3600000;
			expect(datePipe.transform(dt2 - dayMilliseconds)).toEqual('昨天');
			expect(datePipe.transform(dt2 + dayMilliseconds)).toEqual('明天');

			expect(datePipe.transform(0)).toEqual('1970年1月1日星期四'); // 1970
			expect(datePipe.transform(10)).toEqual('1970年1月1日星期四'); // 1970
			expect(datePipe.transform(-100000000000)).toEqual('1966年11月1日星期二'); // Before 1970
		} finally {
			DateFunc.setDefaultLocale(defaultLocale);
		}
	});

	it('invalidInputs', () => {
		expect(datePipe.transform(null, 'invalid')).toEqual('invalid');
		expect(datePipe.transform(null)).toEqual('');
		expect(datePipe.transform(undefined)).toEqual('');
		expect(datePipe.transform('')).toEqual('');
		expect(()=>datePipe.transform('kkk')).toThrow(new RangeError('Invalid string for Date'));
	});
});

describe('literalDateSpanish', () => {
	let datePipe: LiteralDatePipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: LiteralDatePipe,
					useValue: new LiteralDatePipe('es')
				},
			]
		});

		datePipe = TestBed.inject(LiteralDatePipe);
	});

	it('transform', () => {
		const defaultLocale = DateFunc.getDefaultLocale();
		try {
			DateFunc.setDefaultLocale('es');
			const dt = Date.parse('2023-12-28T15:33:44Z');
			expect(datePipe.transform(dt)).toEqual('viernes, 29 de diciembre de 2023');

			const dt2 = Date.now();
			expect(datePipe.transform(dt2)).toEqual('hoy');
			const dayMilliseconds = 24 * 3600000;
			expect(datePipe.transform(dt2 - dayMilliseconds)).toEqual('ayer');
			expect(datePipe.transform(dt2 + dayMilliseconds)).toEqual('mañana');
		} finally {
			DateFunc.setDefaultLocale(defaultLocale);
		}
	});
});





