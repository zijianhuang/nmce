import { Component, Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFunc } from '../_func/dateFunc';

/**
 * Pick dates between.
 * If start date is not defined, it will be today from now.
 * If the end date is not defined, it will be 180 days from the start date.
 */
@Component({

	selector: 'DateRangePicker',
	templateUrl: 'dateRangePicker.component.html',
})
export class DateRangePickerComponent {
	title = 'Date Range';

	startDate: Date;
	endDate: Date;

	constructor(public dialogRef: MatDialogRef<DateRangePickerComponent>, @Inject(MAT_DIALOG_DATA) public data: { start: Date, end: Date }) {
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
@Injectable()
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
	 * Picke dates between through DateRangePickerComponent.
	 * If start date is not defined, it will be today from now.
	 * If the end date is not defined, it will be 180 days from the start date.
	 */
	open(start: Date | undefined, end: Date | undefined): Observable<{ start: Date, end: Date }> {
		const modalRef = this.isHandsetPortrait ?
			this.dialog.open(DateRangePickerComponent, {
				disableClose: true,
				minWidth: '98vw',
				maxHeight: '95vh',
				data: {
					start: start,
					end: end
				}
			})
			: this.dialog.open(DateRangePickerComponent, {
				disableClose: true,
				data: {
					start: start,
					end: end
				}
			});
		return modalRef.afterClosed();
	}

}
