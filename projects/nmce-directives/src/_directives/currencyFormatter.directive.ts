import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CurrencyFunc } from 'nmce-func';

/**
 * Decorate HTML input for inputting and displaying currency. The input type must not be number and should be text only.
 * If the input type is number, the built-in validator will be fighting against this directive.
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
		this.el.value = CurrencyFunc.parseCurrency(value); // opposite to transform
	}

	@HostListener('blur', ['$event.target.value'])
	onBlur(value: string) {
		this.el.value = CurrencyFunc.transformCurrency(value);
	}

}

