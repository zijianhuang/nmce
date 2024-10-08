import { TestBed } from '@angular/core/testing';
import { ShortDatePipe } from './date.pipe';
import { Injector } from '@angular/core';

describe('shortDatePipe', () => {
	let shortDatePipe: ShortDatePipe;
	// beforeEach(()=>{
	// 	TestBed.configureTestingModule({
	// 		providers: [ShortDatePipe]
	// 	});

	// 	shortDatePipe= TestBed.inject(ShortDatePipe);
	// });
	const pipe = new ShortDatePipe('en-au', '+1000');
	
	it('transform', () => {
		const dt = Date.parse('2023-12-28T15:33:44Z');
		expect(pipe.transform(dt)).toEqual('2023-12-28');
	});

});
