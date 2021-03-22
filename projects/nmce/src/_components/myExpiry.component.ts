import { Component, Input, Output, Injectable, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';

//import { DateFunc } from 'nmce-func';
/**
 * Display 20 years in the future, with 12 months each. Good for display expiry date within 20 years.
 */
@Component({
	selector: 'my-expiry',
	templateUrl: 'myExpiry.component.html',
})
export class MYExpiryComponent {
	yearSlots: { value: number | undefined, display: string }[] = [{ value: undefined, display: '' }];

	monthSlots = [
		{ value: undefined, display: '' },
		{ value: 1, display: '01' },
		{ value: 2, display: '02' },
		{ value: 3, display: '03' },
		{ value: 4, display: '04' },
		{ value: 5, display: '05' },
		{ value: 6, display: '06' },
		{ value: 7, display: '07' },
		{ value: 8, display: '08' },
		{ value: 9, display: '09' },
		{ value: 10, display: '10' },
		{ value: 11, display: '11' },
		{ value: 12, display: '12' },
	];

	selectedYear: number | undefined;
	selectedMonth: number | undefined;

	constructor() {
		const currentYear = moment().year();
		for (let i = 0; i < 20; i++) {
			this.yearSlots.push({
				value: i + currentYear, display: (i + currentYear).toString()
			});
		}
	}

	@Input()
	get value(): number {
		let v = 0;
		if (this.selectedYear) {
			v += this.selectedYear * 100;
		}

		if (this.selectedMonth) {
			v += this.selectedMonth;
		}

		console.debug(v);
		return v;
	}
	set value(v: number) {
		if (!v) {
			this.selectedMonth = undefined;
			this.selectedYear = undefined;
		} else {
			this.selectedYear = Math.trunc(v / 100);
			this.selectedMonth = Math.trunc(v % 100);
		}
	}

	@Output()
	change = new EventEmitter<number>();

	onSelectionChange(e: MatSelectChange) {
		console.debug(`selected: ${e.value} m: ${this.selectedMonth}  y: ${this.selectedYear} `);
		this.change.emit(this.value);
	}

}

