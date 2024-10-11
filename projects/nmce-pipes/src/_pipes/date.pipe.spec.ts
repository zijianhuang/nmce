import { TestBed } from '@angular/core/testing';
import { ShortDatePipe, Short24Pipe } from './date.pipe';
import { Injector } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import { ShortTimePipe } from 'nmce-pipes';

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
		const pipe = new ShortDatePipe('en-us', '+1000');
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('29/12/2023');

		const d2 = Date.parse('2023-12-28T11:33:44Z');
		expect(pipe.transform(d2)).toEqual('28/12/2023');		
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
	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [ShortDatePipe,
				Short24Pipe,
				ShortTimePipe,
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
		//expect(shortTimePipe.transform(dt)).toEqual('05:33 am');
		//const datePipe = new DatePipe('en-au', '-1000', {dateFormat: 'HH:mm'});
		//expect(datePipe.transform(dt)).toEqual('23:33');

		const dt2 = Date.parse('2023-12-28T09:33:44Z');
		expect(shortDatePipe.transform(dt2)).toEqual('27/12/2023');		
		expect(short24Pipe.transform(dt2)).toEqual('23:33');
		//expect(shortTimePipe.transform(dt2)).toEqual('11:33 pm');

		const datePipe2 = new DatePipe('en-au', '-1000', {dateFormat: 'HH:mm'});
		expect(datePipe2.transform(dt2)).toEqual('23:33');
	});
});



