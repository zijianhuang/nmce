/**
 * Currency calculations. Undefined input of number is considered zero, just like null.
 */
export class CurrencyFunc {
	private static DECIMAL_SEPARATOR = '.';
	private static THOUSANDS_SEPARATOR = ',';

	private static PADDING = '000000';

	/**
	 *
	 * @param num
	 * @param decimalPlaces default 0
	 */
	static bankerRound(num: number | null | undefined, decimalPlaces?: number): number {//http://stackoverflow.com/questions/3108986/gaussian-bankers-rounding-in-javascript
		if (!num) {
			return 0;
		}

		const d = decimalPlaces || 0;
		const m = Math.pow(10, d);
		const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
		const i = Math.floor(n), f = n - i;
		const e = 1e-8; // Allow for rounding errors in f
		const r = (f > 0.5 - e && f < 0.5 + e) ?
			((i % 2 === 0) ? i : i + 1) : Math.round(n);
		return d ? r / m : r;
	}

	static bankerRoundTo5cents(num: number | null | undefined): number {
		if (!num) {
			return 0;
		}

		const r = this.bankerRound(Math.ceil(num * 20 - 0.5) / 20, 2);
		return r;
	}

	static ceilTo5cents(num: number | null | undefined): number {
		if (!num) {
			return 0;
		}

		const r = this.bankerRound(Math.ceil(num * 20) / 20, 4);
		const roundup = Math.ceil(r * 10000) / 10000;
		return roundup;
	}

	static transformCurrency(value: number | string | undefined, fractionSize: number = 2): string {
		let [integer, fraction = ''] = (value || '').toString()
			.split(this.DECIMAL_SEPARATOR);

		fraction = fractionSize > 0
			? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
			: '';

		integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

		return integer + fraction;
	}

	static parseCurrency(value: string | undefined, fractionSize: number = 2): string {
		let [integer, fraction = ''] = (value || '').split(this.DECIMAL_SEPARATOR);

		integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

		fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
			? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
			: '';

		return integer + fraction;
	}


	//http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
	static pad(num: number | null | undefined, size: number): string {

		num = null;
		let s = num + '';
		while (s.length < size) { s = '0' + s; }
		return s;
	}

	static sum(ns: (number | null | undefined)[]): number {
		const r = <number>ns.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
		return r;
	}

}
