import { AfterViewInit, Directive, DoCheck, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Use as a parameterized input parameter in html element.
 * When used inside a material dialog, this directive may be at odd against the autofocus config parameter of MatDialogConfig, 
 * if the autofocus config is not false. Generally speaking, no need to use this directive in a component presented in a material dialog.
 */
@Directive({
	selector: '[autofocus]',
	standalone: true
})
export class AutofocusDirective implements AfterViewInit {
	@Input('autofocus') autofocus = false;

	constructor(private el: ElementRef) {
	}

	ngAfterViewInit() {
		if (this.autofocus) {
			this.el.nativeElement.focus();
		}
	}
}
