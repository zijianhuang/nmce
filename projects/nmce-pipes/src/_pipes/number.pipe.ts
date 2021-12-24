import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyFunc, StringFunc } from 'nmce-func';

/*
 * Currency pipe for display with $ sign. currency pipes of ng2 and 4 not working in iPad
 */
@Pipe({ name: 'currencyAUD' })
export class AudCurrencyPipe extends CurrencyPipe {
	transform(value: number | string| undefined | null): any { // have to change to any in NG 11.
		return super.transform(value, 'AUD', 'symbol');
	}
}

@Pipe({ name: 'centsToAUD' })
export class CentToDollarPipe extends CurrencyPipe {
	transform(value: number | string| undefined | null): any { // have to change to any in NG 11.

		if (typeof value == 'number'){
			return super.transform(CurrencyFunc.bankerRound(value/100, 2), 'AUD', 'symbol');
		}

		if (typeof value == 'string'){
			const n = parseInt(value);
			return super.transform(CurrencyFunc.bankerRound(n/100, 2), 'AUD', 'symbol');
		}

		return value;
	}
}

@Pipe({ name: 'invoice' })
export class InvoicePipe implements PipeTransform {
	transform(n: number): string {
		return StringFunc.pad(n, 6);
	}
}
