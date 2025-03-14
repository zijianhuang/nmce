import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyFunc, StringFunc } from 'nmce-func';

// /*
//  * Currency pipe for display with $ sign, with banker rounding. currency pipes of ng2 and 4 not working in iPad
//  * @deprecated just use bankerRound pipe
//  */
// @Pipe({ name: 'currencyAUD' })
// export class AudCurrencyPipe extends CurrencyPipe {
// 	transform(value: number | string| undefined | null): any { // have to change to any in NG 11.
// 		if (typeof value == 'number'){
// 			return super.transform(CurrencyFunc.bankerRound(value, 2), 'AUD', 'symbol');
// 		}

// 		if (typeof value == 'string'){
// 			const n = parseInt(value);
// 			return super.transform(CurrencyFunc.bankerRound(n, 2), 'AUD', 'symbol');
// 		}

// 		return value;
// 	}
// }

// /**
//  * Cents to Dollar, with banker rounding.
//  *  * @deprecated just do /100 in codes.
//  */
// @Pipe({ name: 'centsToAUD' })
// export class CentToDollarPipe extends CurrencyPipe {
// 	transform(value: number | string| undefined | null): any { // have to change to any in NG 11.

// 		if (typeof value == 'number'){
// 			return super.transform(CurrencyFunc.bankerRound(value/100, 2), 'AUD', 'symbol');
// 		}

// 		if (typeof value == 'string'){
// 			const n = parseInt(value);
// 			return super.transform(CurrencyFunc.bankerRound(n/100, 2), 'AUD', 'symbol');
// 		}

// 		return value;
// 	}
// }

@Pipe({
    name: 'bankerRound',
    standalone: false
})
export class BankerRoundPipe implements PipeTransform {
	transform(value: number | string| undefined | null, decimalPlace: number = 0): any { // have to change to any in NG 11.
		if (typeof value == 'number'){
			return CurrencyFunc.bankerRound(value, decimalPlace);
		}

		if (typeof value == 'string'){
			const n = parseInt(value);
			return CurrencyFunc.bankerRound(n, decimalPlace);
		}

		return value;
	}
}

/**
 * Pad number with zero
 */
@Pipe({
    name: 'pad',
    standalone: false
})
export class PadPipe implements PipeTransform {
	transform(n: number, length: number): string {
		return StringFunc.pad(n, length);
	}
}
