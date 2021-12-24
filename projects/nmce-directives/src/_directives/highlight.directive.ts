import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Mouse over to highlight. This is more like a demo directive.
 */
@Directive({
	selector: '[myHighlight]'
})
export class HighlightDirective {
	constructor(private el: ElementRef) {
		console.debug('HighlightDirective created.');
	}

	@Input() defaultColor?: string;
	@Input('myHighlight') highlightColor?: string;
	@HostListener('mouseenter') onMouseEnter() {
		this.highlight(this.highlightColor || this.defaultColor || 'red');
	}
	@HostListener('mouseleave') onMouseLeave() {
		this.highlight(undefined);
	}
	private highlight(color: string | undefined) {
		this.el.nativeElement.style.backgroundColor = color;
	}
}
