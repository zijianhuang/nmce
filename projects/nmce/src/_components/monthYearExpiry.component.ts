import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DateTime } from 'luxon';

/**
 * Display 20 years in the future, with 12 months each. Good for display expiry date within 20 years.
 */
@Component({
	selector: 'month-year-expiry, nmce-month-year-expiry',
	templateUrl: 'monthYearExpiry.component.html',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatSelectModule,
	]
})
export class MonthYearExpiryComponent implements OnInit {
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

	/**
	 * Default 20.
	 */
	@Input()
	yearsInFuture = 20;

	/**
	 * FormControl of parent modlel with FormGroup. Dirty when user changes value.
	 *
	 */
	@Input()
	yearMonthExpiry: FormControl;

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

	/**
	 * Optional event when user changes value.
	 */
	@Output()
	change = new EventEmitter<number>();
	constructor() {
	}

	ngOnInit() {
		const currentYear = DateTime.now().year;
		for (let i = 0; i < this.yearsInFuture; i++) {
			this.yearSlots.push({
				value: i + currentYear, display: (i + currentYear).toString()
			});
		}

		if (this.yearMonthExpiry && this.yearMonthExpiry.value) {
			this.value = parseInt(this.yearMonthExpiry.value);
		}
	}

	onSelectionChange(e: MatSelectChange) {
		console.debug(`selected: ${e.value} m: ${this.selectedMonth}  y: ${this.selectedYear} `);
		this.change.emit(this.value);
		this.yearMonthExpiry.setValue(this.value);
		this.yearMonthExpiry.markAsDirty(); //need to explicitly set it if the FormCotrol is not with FormGroup
	}
}

