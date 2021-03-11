import { Directive, AfterViewInit, ElementRef, DoCheck, Input } from '@angular/core';


// Simple example directive that fixes autofocus problem with multiple views, source: https://www.picnet.com.au/blogs/guido/post/2016/09/20/angular2-ng2-focus-directive/
@Directive({
	selector: '[autofocus]' // using [ ] means selecting attributes
})

export class AutofocusDirective implements AfterViewInit, DoCheck {
	private lastVisible = false;
	private initialised = false;
	constructor(private el: ElementRef) {
		console.debug('autofocusDirective created.');
	}

	ngAfterViewInit() {
		this.initialised = true;
		this.ngDoCheck();
	}

	ngDoCheck() {
		if (!this.initialised) { return; }
		const visible = !!this.el.nativeElement.offsetParent;
		if (visible && !this.lastVisible) {
			setTimeout(() => { this.el.nativeElement.focus(); }, 2); //no need to clearTimeout
		}
		this.lastVisible = visible;
	}

	@Input() set autofocus(condition: boolean) {
		this.lastVisible = condition !== false;
	}
}
