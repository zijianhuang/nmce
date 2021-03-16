import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { CurrencyFunc } from 'nmce-func';

/**
 *
 */
@Directive({ selector: '[currencyFormatter]' })//inspired by https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976
export class CurrencyFormatterDirective implements OnInit {

	private el: HTMLInputElement;

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	ngOnInit() {
		this.el.value = CurrencyFunc.transformCurrency(this.el.value);
	}

	@HostListener('focus', ['$event.target.value'])
	onFocus(value: string) {
		this.el.value = CurrencyFunc.parseCurrency(value); // opossite of transform
	}

	@HostListener('blur', ['$event.target.value'])
	onBlur(value: string) {
		this.el.value = CurrencyFunc.transformCurrency(value);
	}

}

