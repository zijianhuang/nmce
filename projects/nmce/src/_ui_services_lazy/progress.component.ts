import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { DIALOG_ACTIONS_ALIGN, TransmitProgress } from '../public-api';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * Confirmation to say Yes or No. When saying Yes, return result true, otherwise, return activeModal.dismiss().
 * This component is used by ConfirmService, which actionLabel and cancelLabel can be overriden by client calls.
 */
@Component({
    templateUrl: 'progress.component.html',
    standalone: true,
	imports: [MatButtonModule,MatDialogModule, CommonModule, MatProgressBarModule]
})
export class ProgressComponent {
	@Input()
	title: string;

	@Input()
	body: string;

	cancelCallback?: () => void;

	/**
	 * 0-100. "By default, the progress bar sets aria-valuemin to 0 and aria-valuemax to 100. Avoid changing these values, as this may cause incompatibility with some assistive technology."
	 */
	progressBarValue = 0;

	get progressBarMode() {
		return this.data.progressBarMode;
	}

	get progressBarBufferValue() {
		return this.data.progressBarBufferValue;
	}

	constructor(@Inject(MAT_DIALOG_DATA) private data: {
		title: string, body: string, progressBarMode: ProgressBarMode, progressBarBufferValue?: number
		},
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		private dialogRef: MatDialogRef<ProgressComponent>) {
		this.title = data.title;
		this.body = data.body;
	}

	cancel() {
		if (this.cancelCallback) {
			this.cancelCallback();
		}
	}

	setCancelCallback(cancelCallback: () => void) {
		this.cancelCallback = cancelCallback;
	}
}

@Injectable()
export class ProgressDialogService {
	modalRef?: MatDialogRef<ProgressComponent>;

	private _opened = false;
	/**
	 * Tell client codes if the dialog is opened.
	 */
	get opened() {
		return this._opened;
	}
	set opened(v: boolean) {
		this._opened = v;
	}

	constructor(private dialog: MatDialog) { }

	open(title: string, body: string, progressBarMode: ProgressBarMode, progressBarBufferValue?: number): Observable<boolean> {
		this.modalRef = this.dialog.open(ProgressComponent, {
			disableClose: true,
			hasBackdrop: true,
			width: '70%',
			data: {
				title: title,
				body: body,
				progressBarMode: progressBarMode,
				progressBarBufferValue: progressBarBufferValue,
			}
		});

		this.opened = true;
		const c = this.modalRef.afterClosed();
		c.subscribe(() => this.opened = false);
		return c;
	}

	closeIfOpened() {
		if (this.opened) {
			this.modalRef?.close();
		}
	}

	set(p: TransmitProgress) {
		if (this.modalRef) {
			this.modalRef.componentInstance.body = p.message!;
			if (p.loaded != undefined) {
				this.modalRef.componentInstance.progressBarValue = p.loaded;
			}
		}
	}

	setCancelCallback(cancelCallback: () => void) {
		if (this.modalRef) {
			this.modalRef.componentInstance.setCancelCallback(cancelCallback);
		}
	}
}
