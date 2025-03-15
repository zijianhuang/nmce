import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * Confirmation to say Yes or No. When saying Yes, return result true, otherwise, return activeModal.dismiss().
 * This component is used by ConfirmService, which actionLabel and cancelLabel can be overriden by client calls.
 */
@Component({
    selector: 'confirm-content',
    templateUrl: 'confirm.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: false
})
export class ConfirmComponent {
	@Input()
	title: string;

	@Input()
	body: string;

	actionLabel = $localize`Yes`;
	cancelLabel = $localize`No`;

	constructor(@Inject(MAT_DIALOG_DATA) private data: { title: string, body: string, action: string, cancel: string },
	 @Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
	 private dialogRef: MatDialogRef<ConfirmComponent>) {
		this.title = data.title;
		this.body = data.body;
		this.actionLabel = data.action;
		this.cancelLabel = data.cancel;
	}

	confirm(): void {
		this.dialogRef.close(true);
	}
}
