import { CurrencyFunc } from './currencyFunc';

describe('currencyFunc', () => {
	it('bankerRound', () => {
		expect(CurrencyFunc.bankerRound(3.5)).toEqual(4);
		expect(CurrencyFunc.bankerRound(2.5)).toEqual(2);
		expect(CurrencyFunc.bankerRound(8.55, 1)).toEqual(8.6);
		expect(CurrencyFunc.bankerRound(8.45, 1)).toEqual(8.4);
		expect(CurrencyFunc.bankerRound(8.555, 2)).toEqual(8.56);

		expect(CurrencyFunc.bankerRound(8.554, 2)).toEqual(8.55);
		expect(CurrencyFunc.bankerRound(8.546, 2)).toEqual(8.55);		
		expect(CurrencyFunc.bankerRound(7.4)).toEqual(7);
		expect(CurrencyFunc.bankerRound(8.6)).toEqual(9);		
	});
	
	it('bankerRoundTo5cents', () => {
		expect(CurrencyFunc.bankerRoundTo5cents(3.53)).toEqual(3.55);
		expect(CurrencyFunc.bankerRoundTo5cents(3.52)).toEqual(3.50);
		expect(CurrencyFunc.bankerRoundTo5cents(3.525)).toEqual(3.55);
		expect(CurrencyFunc.bankerRoundTo5cents(3.526)).toEqual(3.55);
		expect(CurrencyFunc.bankerRoundTo5cents(3.535)).toEqual(3.55);
		
		expect(CurrencyFunc.bankerRoundTo5cents(3.56)).toEqual(3.55);
		expect(CurrencyFunc.bankerRoundTo5cents(3.574)).toEqual(3.55);
		expect(CurrencyFunc.bankerRoundTo5cents(3.576)).toEqual(3.60);
		expect(CurrencyFunc.bankerRoundTo5cents(3.58)).toEqual(3.60);
		expect(CurrencyFunc.bankerRoundTo5cents(3.575)).toEqual(3.60);		
		//https://www.calculatorsoup.com/calculators/math/round-to-nearest-multiple.php
	});

	it('sum', ()=>{
		expect(CurrencyFunc.sum([1,2, undefined, 3, null, 5])).toEqual(11);
		expect(CurrencyFunc.sum([undefined, null])).toEqual(0);
	});

	it('pad', ()=>{
		expect(CurrencyFunc.pad(123.4, 6)).toBe('0123.4');
		expect(CurrencyFunc.pad(0, 6)).toBe('0');
		expect(CurrencyFunc.pad(null, 6)).toBe('');
	});

});
