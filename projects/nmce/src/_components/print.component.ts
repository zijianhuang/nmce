import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { HtmlPrintFunc } from 'nmce-func';

/**
 * To be embedded in any view to print a section of the view marked by element id.
 */
@Component({
    selector: 'print-page, nmce-print-page, nmcePrintPage',
    exportAs: 'nmcePrintPage',
    template: `
	 <button (click)="printDiv()" mat-raised-button mdTooltip="Print content">Print</button>
	`,
    standalone: true
})
export class PrintComponent implements OnInit {//inspired by https://www.linkedin.com/pulse/create-print-component-angular2-which-user-defined-html-rajesh-g

	@Input() section: string;
	@Output() sectionChange = new EventEmitter<any>();

	constructor(private ele: ElementRef, private location: Location, @Inject('print.cssUrl') private cssUrl: string) {
		if (this.section === undefined) {
			this.section = '';
		}
	}

	ngOnInit(): void {
		console.debug('ready to print ' + this.section);
	}

	printDiv() {

		if (this.section) {
			const element = document.getElementById(this.section);
			if (element) {
				const printContents = element.innerHTML;
				HtmlPrintFunc.printWithCSS(printContents, this.location.prepareExternalUrl(this.cssUrl));
			}
		}
	}

}
