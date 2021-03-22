import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

export class MonthYear {
	constructor(public month: number, public year: number) { }

	get value() {
		return this.year * 100 + this.month;
	}
}


@Component({
	selector: 'month-year',
	templateUrl: 'monthYear.component.html',
	providers: [{ provide: MatFormFieldControl, useExisting: MonthYearComponent }],
	host: {
		'[class.floating]': 'shouldLabelFloat',
		'[id]': 'id',
		'[attr.aria-describedby]': 'describedBy',
	}
})
export class MonthYearComponent implements MatFormFieldControl<MonthYear>, OnDestroy {
	static nextId = 0;

	parts: FormGroup;

	stateChanges = new Subject<void>();

	focused = false;

	ngControl = null;

	errorState = false;

	controlType = 'month-year';

	get empty() {
		const n = this.parts.value;
		return !n.month && !n.year;
	}

	get shouldLabelFloat() { return this.focused || !this.empty; }

	id = `month-year-${MonthYearComponent.nextId++}`;

	describedBy = '';

	@Input()
	get placeholder() { return this._placeholder; }
	set placeholder(plh) {
		this._placeholder = plh;
		this.stateChanges.next();
	}
	private _placeholder: string;

	@Input()
	get required() { return this._required; }
	set required(req) {
		this._required = coerceBooleanProperty(req);
		this.stateChanges.next();
	}
	private _required = false;

	@Input()
	get disabled() { return this._disabled; }
	set disabled(dis) {
		this._disabled = coerceBooleanProperty(dis);
		this.stateChanges.next();
	}
	private _disabled = false;

	@Input()
	get value(): MonthYear | null {
		const n = this.parts.value;
		if (n.month >= 1 && n.month <= 12 && n.year >= 18 && n.year <= 99) {
			return new MonthYear(n.month, n.year);
		}
		return null;
	}
	set value(my: MonthYear | null) {
		my = my || new MonthYear(0, 0);
		this.parts.setValue({ month: my.month, year: my.year });
		this.stateChanges.next();
	}

	constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef) {
		this.parts = fb.group({
			'month': 1,
			'year': 18,
		});

		fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
			this.focused = !!origin;
			this.stateChanges.next();
		});
	}

	ngOnDestroy() {
		this.stateChanges.complete();
		this.fm.stopMonitoring(this.elRef.nativeElement);
	}

	setDescribedByIds(ids: string[]) {
		this.describedBy = ids.join(' ');
	}

	onContainerClick(event: MouseEvent) {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			this.elRef.nativeElement.querySelector('input').focus();
		}
	}
}

