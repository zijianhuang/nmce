import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DateFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/**
 * Pick dates between.
 * If start date is not defined, it will be today from now.
 * If the end date is not defined, it will be 180 days from the start date.
 * todo: compare with what in NMC, may be obsolete.
 */
@Component({
	selector: 'DateRangePicker, nmce-date-range-picker',
	templateUrl: 'dateRangePicker.component.html',
	styleUrls: ['../nmcestyles.css'],
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule,]
})
export class DateRangePickerComponent {
	title = $localize`Date Range`;

	startDate: Date;
	endDate: Date;

	constructor(public dialogRef: MatDialogRef<DateRangePickerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { start: Date, end: Date },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
	) {
		this.startDate = data.start ? data.start : DateFunc.now;
		this.endDate = DateFunc.getEndOfDate(data.end ? data.end : DateFunc.addDays(this.startDate, 180));
	}

	submit(): void {
		this.dialogRef.close({ start: this.startDate, end: this.endDate });
	}

	cancel(): void {
		this.dialogRef.close(undefined);
	}

	clear(): void {
		this.dialogRef.close(null);
	}
}

/**
 * Pick dates between.
 */
@Injectable({ providedIn: 'root' })
export class DateRangePickerService {
	private isHandsetPortrait: boolean;
	constructor(private dialog: MatDialog, breakpointObserver: BreakpointObserver) {
		breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe(
			r => {
				this.isHandsetPortrait = r.matches;
			}
		);
	}

	/**
	 * Pick dates between through DateRangePickerComponent.
	 * If start date is not defined, it will be today from now.
	 * If the end date is not defined, it will be 180 days from the start date.
	 */
	open(start: Date | undefined, end: Date | undefined): Observable<{ start: Date, end: Date } | undefined | null> {
		const modalRef = this.isHandsetPortrait ?
			this.dialog.open(DateRangePickerComponent, {
				minWidth: '98vw',
				maxHeight: '95vh',
				data: {
					start: start,
					end: end
				}
			})
			: this.dialog.open(DateRangePickerComponent, {
				data: {
					start: start,
					end: end
				}
			});
		return modalRef.afterClosed();
	}

}
