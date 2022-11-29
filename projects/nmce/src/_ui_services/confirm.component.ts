import { Component, Input, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

/**
 * Confirmation to say Yes or No. When saying Yes, return result true, otherwise, return activeModal.dismiss().
 * This component is used by ConfirmService
 */
@Component({
	selector: 'confirm-content',
	templateUrl: 'confirm.component.html',
})
export class ConfirmComponent {
	@Input()
	title: string;

	@Input()
	body: string;

	actionLabel = 'Yes';
	cancelLabel = 'No';

	constructor(@Inject(MAT_DIALOG_DATA) private data: { title: string, body: string, action: string, cancel: string }, private dialogRef: MatDialogRef<ConfirmComponent>) {
		this.title = data.title;
		this.body = data.body;
		this.actionLabel = data.action;
		this.cancelLabel = data.cancel;
	}

	confirm(): void {
		this.dialogRef.close(true);
	}

	cancel(): void {
		this.dialogRef.close();
	}
}
