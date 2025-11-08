import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Scroll to element attached. And the element may be an Angular Material component too.
 */
@Directive({
    selector: '[scrollInto]',
    standalone: true
})
export class ScrollIntoDirective implements AfterViewInit {
	constructor(private el: ElementRef) {
		//	console.debug('ScrollIntoDirective created.');
	}

	@Input()
	scrollInto: boolean = false;

	ngAfterViewInit() {
		if (this.scrollInto) {
			this.el.nativeElement.scrollIntoView();
		}
	}
}
