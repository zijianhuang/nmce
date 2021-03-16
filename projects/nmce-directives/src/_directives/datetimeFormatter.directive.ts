import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import moment from 'moment';

/**
 *
 */
@Directive({ selector: '[datetimeFormatter]' })//inspired by https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976
export class DatetimeFormatterDirective implements OnInit {

	private el: HTMLInputElement;

	//@Input('datetimeFormatter')
	format = 'DD/MM/YYYY HH:mm';

	formats = ['', 'DD/MM/YYYY HH:mm'];

	constructor(private elementRef: ElementRef) {
		this.el = this.elementRef.nativeElement;
	}

	ngOnInit() {
		const s = this.parse(this.el.value);
		this.el.value = this.transform(s);
	}

	@HostListener('focus', ['$event.target.value'])
	onFocus() {
		const s = this.parse(this.el.value);
		this.el.value = this.transform(s);
	}

	@HostListener('blur', ['$event.target.value'])
	onBlur() {
		this.el.value = this.transform(this.el.value);
	}

	transform(value: Date | string | null): string {
		if (!value) {
			return '';
		}

		const s = moment(value).format(this.format);
		console.debug(`With format ${this.format} transform to ${s}`);
		return s;
	}

	parse(value: string): Date | null {
		if (!value) {
			return null;
		}

		const d = moment(value, this.formats).toDate();
		console.debug(`parse ${value} to ${d}`);
		return d;
	}

}

