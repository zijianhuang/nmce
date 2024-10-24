/**
 * Currency calculations. Undefined input of number is considered zero, just like null.
 * Simple functions for currency before you decide to use more comprehensive ones:
 * https://github.com/scurker/currency.js
 * https://github.com/dinerojs/dinero.js Up to date and popular
 */
export class CurrencyFunc {
	private static DECIMAL_SEPARATOR = '.';
	private static THOUSANDS_SEPARATOR = ',';

	private static PADDING = '000000';

	/**
	 * Banker rounding
	 * @param num
	 * @param decimalPlace default 0
	 */
	static bankerRound(num: number | null | undefined, decimalPlace?: number): number {
		if (!num) {
			return 0;
		}

		const d = decimalPlace || 0;
		const m = Math.pow(10, d);
		const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
		const i = Math.floor(n), f = n - i;
		const e = 1e-8; // Allow for rounding errors in f
		const r = (f > 0.5 - e && f < 0.5 + e) ?
			((i % 2 === 0) ? i : i + 1) : Math.round(n);
		return d ? r / m : r;
		// http://stackoverflow.com/questions/3108986/gaussian-bankers-rounding-in-javascript
	}

	/**
	 * Banker rounding to 5 cents
	 * @param num 
	 * @returns 
	 */
	static bankerRoundTo5cents(num: number | null | undefined): number {
		if (!num) {
			return 0;
		}

		const r = this.bankerRound(Math.round(num / 0.05) * 0.05, 2);
		return r;
	}

	// static transformCurrency(value: number | string | undefined, fractionSize: number = 2): string { In favour of dinerojs
	// 	let [integer, fraction = ''] = (value || '').toString()
	// 		.split(this.DECIMAL_SEPARATOR);

	// 	fraction = fractionSize > 0
	// 		? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
	// 		: '';

	// 	integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

	// 	return integer + fraction;
	// }

	// static parseCurrency(value: string | undefined, fractionSize: number = 2): string {
	// 	let [integer, fraction = ''] = (value || '').split(this.DECIMAL_SEPARATOR);

	// 	integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

	// 	fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
	// 		? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
	// 		: '';

	// 	return integer + fraction;
	// }


	//http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
	static pad(num: number | null | undefined, size: number): string {
		if (num == null){
			 return '';
		}

		if (num ===0){
			return '0';
		}

		const numText = num.toString();
		let s = numText + '';
		while (s.length < size) { s = '0' + s; }
		return s;
	}

	/**
	 * Sum array of numbers
	 * @param ns 
	 * @returns 
	 */
	static sum(ns: (number | null | undefined)[]): number {
		const r = <number>ns.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
		return r;
	}

}
