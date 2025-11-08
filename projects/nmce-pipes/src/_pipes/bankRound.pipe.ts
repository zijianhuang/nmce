import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyFunc } from 'nmce-func';

@Pipe({
    name: 'bankerRound',
    standalone: true
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
