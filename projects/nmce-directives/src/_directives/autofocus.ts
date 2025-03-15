import { AfterViewInit, Directive, DoCheck, ElementRef, Input } from '@angular/core';

/**
 * Use as a parameterized input parameter in html element.
 * When used inside a material dialog, this directive may be at odd against the autofocus config parameter of MatDialogConfig, 
 * if the autofocus config is not false. Generally speaking, no need to use this directive in a component presented in a mateiral dialog.
 */
@Directive({
    selector: '[autofocus]',
    standalone: false
})
export class AutofocusDirective implements AfterViewInit, DoCheck {
	private toFocus = false;
	private focused = false;
	private initialized = false;
	private everFocused = false;
	constructor(private el: ElementRef) {
		//console.debug('autofocusDirective created.');
	}

	ngAfterViewInit() {
		this.initialized = true;
		this.ngDoCheck();
	}

	ngDoCheck() {
		if (!this.initialized) { return; }
		if (this.toFocus && !this.everFocused && !this.focused) {
			this.el.nativeElement.focus();
			this.focused = true;
			this.everFocused = true;
			console.debug('focused now.');
		}
	}

	@Input() 
	get autofocus(){
		return this.focused;
	}
	set autofocus(condition: boolean) {
		this.toFocus = condition !== false;
	}
}
