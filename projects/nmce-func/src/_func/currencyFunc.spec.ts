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

});
