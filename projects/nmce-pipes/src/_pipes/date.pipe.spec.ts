import { TestBed } from '@angular/core/testing';
import { ShortDatePipe, Short24Pipe, LiteralDatePipe, ShortTimePipe } from './date.pipe';
import { Injector } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import moment from 'moment';

describe('shortDatePipe', () => {
	let shortDatePipe: ShortDatePipe;
	// beforeEach(()=>{
	// 	TestBed.configureTestingModule({
	// 		providers: [ShortDatePipe]
	// 	});

	// 	shortDatePipe= TestBed.inject(ShortDatePipe);
	// });
	
	it('transformCrossTimezonesAu', () => {
		const pipe = new ShortDatePipe('en-au', '+1000');
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('29/12/2023');

		const d2 = Date.parse('2023-12-28T11:33:44Z');
		expect(pipe.transform(d2)).toEqual('28/12/2023');		
	});

	it('transformCrossTimezonesUs', () => {
		const pipe = new ShortDatePipe('en-us', '+1000'); //this pipe ignore locale
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('29/12/2023');

		const d2 = Date.parse('2023-12-28T11:33:44Z');
		expect(pipe.transform(d2)).toEqual('28/12/2023');		
	});

	/**
	 * https://angular.dev/api/common/DatePipe?tab=usage-notes
	 */
	it('transformDatePipeAu', () => {
		const pipe = new DatePipe('en-au', '+1000');
		const dt = Date.parse('2023-12-08T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('Dec 9, 2023');

		const d2 = Date.parse('2023-12-28T11:33:44Z');
		expect(pipe.transform(d2)).toEqual('Dec 28, 2023');		
	});

	/**
	 * https://v17.angular.io/api/common/DatePipe, the default dateFormat is obviously mediumDate
	 */
	it('transformDatePipeUs', () => {
		const pipe = new DatePipe('en-us', '+1000'); //this pipe ignore locale
		const dt = Date.parse('2023-12-08T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('Dec 9, 2023');

		const d2 = Date.parse('2023-12-28T11:33:44Z');
		expect(pipe.transform(d2)).toEqual('Dec 28, 2023');		
	});	
});

describe('WithTimezone10', () => {
	let shortDatePipe: ShortDatePipe;
	let short24Pipe: Short24Pipe;
	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [ShortDatePipe,
				Short24Pipe,
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: {timezone: '+1000'}
				}
			]
		});

		shortDatePipe= TestBed.inject(ShortDatePipe);
		short24Pipe=TestBed.inject(Short24Pipe);
	});
	
	it('transformCrossTimezonesAu', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(shortDatePipe.transform(dt)).toEqual('29/12/2023');
		expect(short24Pipe.transform(dt)).toEqual('01:33');

		const dt2 = Date.parse('2023-12-28T11:33:44Z');
		expect(shortDatePipe.transform(dt2)).toEqual('28/12/2023');		
		expect(short24Pipe.transform(dt2)).toEqual('21:33');
	});
});

describe('WithTimezoneMinus10', () => {
	let shortDatePipe: ShortDatePipe;
	let short24Pipe: Short24Pipe;
	let shortTimePipe: ShortTimePipe;
	let datePipe: DatePipe;
	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [ShortDatePipe,
				Short24Pipe,
				ShortTimePipe,
				DatePipe,
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: {timezone: '-1000', dateFormat: 'MM/dd/yy'} // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		shortDatePipe= TestBed.inject(ShortDatePipe);
		short24Pipe=TestBed.inject(Short24Pipe);
		shortTimePipe=TestBed.inject(ShortTimePipe);
	});
	
	it('transformCrossTimezones', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(shortDatePipe.transform(dt)).toEqual('28/12/2023');
		expect(short24Pipe.transform(dt)).toEqual('05:33');

		const dt2 = Date.parse('2023-12-28T09:33:44Z');
		expect(shortDatePipe.transform(dt2)).toEqual('27/12/2023');		
		expect(short24Pipe.transform(dt2)).toEqual('23:33');
	});	
});

describe('DatePipeMinus10', () => {
	let datePipe: DatePipe;
	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [
				DatePipe,
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: {timezone: '-1000', dateFormat: 'shortTime'} // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		datePipe= TestBed.inject(DatePipe);
	});
	
	it('transformCrossTimezones', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(datePipe.transform(dt)).toEqual('5:33 AM');

		const dt2 = Date.parse('2023-12-28T09:33:44Z');
		expect(datePipe.transform(dt2)).toEqual('11:33 PM');

		const datePipe2 = new DatePipe('en-au', '-1000', {dateFormat: 'HH:mm'});
		expect(datePipe2.transform(dt2)).toEqual('23:33');
	});	
});

describe('literalDate', () => {
	let datePipe: LiteralDatePipe;
	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [
				LiteralDatePipe,
				{
					provide: DATE_PIPE_DEFAULT_OPTIONS,
					useValue: {locale: 'en-au'} // dateFormat is ignored by ShortDatePipe
				}
			]
		});

		datePipe= TestBed.inject(LiteralDatePipe);
	});
	
	it('transform', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(datePipe.transform(dt)).toEqual('Friday, December 29th 2023');

		const dt2 = Date.now();
		expect(datePipe.transform(dt2)).toEqual('Today');
		const dayMilliseconds = 24*3600000;
		expect(datePipe.transform(dt2-dayMilliseconds)).toEqual('Yesterday');
		expect(datePipe.transform(dt2+dayMilliseconds)).toEqual('Tomorrow');

		expect(datePipe.transform(0)).toEqual('Thursday, January 1st 1970'); // 1970
		expect(datePipe.transform(10)).toEqual('Thursday, January 1st 1970'); // 1970
		expect(datePipe.transform(-100000000000)).toEqual('Tuesday, November 1st 1966'); // Before 1970
	});

	it('invalidInputs', ()=>{
		expect(datePipe.transform(null, 'invalid')).toEqual('invalid');
		expect(datePipe.transform(null)).toEqual('');
		expect(datePipe.transform(undefined)).toEqual('');
		expect(datePipe.transform('')).toEqual('');
		expect(datePipe.transform('kkk')).toEqual('kkk');
	});
});



