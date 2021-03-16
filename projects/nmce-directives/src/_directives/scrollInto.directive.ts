import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
@Directive({
	selector: '[scrollInto]'
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
