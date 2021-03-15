import { Component, Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StringFunc } from '../_func/stringFunc';

/**
 * Input Hour and Minute.
 */
@Component({

	selector: 'timePicker',
	templateUrl: 'timePicker.component.html',
})
export class TimePickerComponent {
	title = 'Time';

	hourSlots = Array.from(Array(24).keys()); // thanks to https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

	minuteSlots = Array.from({ length: 12 }, (v, k) => k++).map(t => 5 * t);

	selectedHour: number;
	selectedMinute: number;

	selectedDate: Date;

	noClear: boolean;

	constructor(@Inject(MAT_DIALOG_DATA) private data: { minutes: number, noClear: boolean }, public dialogRef: MatDialogRef<TimePickerComponent>) {
		this.selectedDate = new Date();
		this.selectedHour = 12;
		this.selectedMinute = 0;
		this.minutes = data.minutes;
		this.noClear = data.noClear;
	}

	get minutes(): number {
		return this.selectedHour * 60 + this.selectedMinute;
	}

	set minutes(v: number) {
		this.selectedHour = Math.floor(v / 60);
		this.selectedMinute = v % 60;
	}

	submit(): void {
		this.dialogRef.close(this.minutes);
	}

	cancel(): void {
		this.dialogRef.close(undefined);
	}

	clear(): void {
		this.dialogRef.close(null);
	}

	pad0(n: number) {
		return StringFunc.pad(n, 2);
	}
}

/**
 * Show dialog of inputting hour and minute.
 */
@Injectable()
export class TimeService implements OnDestroy {
	isHandsetPortrait: boolean;
	private bs: Subscription;
	constructor(private dialog: MatDialog, breakpointObserver: BreakpointObserver) {
		this.bs = breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe(
			r => {
				this.isHandsetPortrait = r.matches;
			}
		);
	}

	/**
	 *
	 * @param minutes since midnight, to be translated to hour and minute.
	 * @param noClear No Clear button
	 */
	open(minutes: number, noClear: boolean = false): Observable<number> {
		const data = {
			minutes: minutes,
			noClear: noClear
		};

		const modalRef = this.isHandsetPortrait ?
			this.dialog.open(TimePickerComponent, {
				disableClose: true,
				minWidth: '98vw',
				maxHeight: '95vh', data: data
			})
			: this.dialog.open(TimePickerComponent, {
				disableClose: true, data: data
			});

		return modalRef.afterClosed();
	}

	ngOnDestroy() {
		this.bs.unsubscribe();
	}
}
