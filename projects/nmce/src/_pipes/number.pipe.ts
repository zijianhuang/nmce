import { Pipe, PipeTransform } from '@angular/core';
import { StringFunc } from '../_func/stringFunc';
import { formatCurrency, CurrencyPipe } from '@angular/common';

/*
 * Currency pipe for display with $ sign. currency pipes of ng2 and 4 not working in iPad
 */
@Pipe({ name: 'currencyAUD' })
export class AudCurrencyPipe extends CurrencyPipe {
	transform(value: number | string| undefined | null): any { // have to change to any in NG 11.
		return super.transform(value, 'AUD', 'symbol');
	}
}

@Pipe({ name: 'invoice' })
export class InvoicePipe implements PipeTransform {
	transform(n: number): string {
		return StringFunc.pad(n, 6);
	}
}
