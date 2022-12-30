import { Component, Inject, Injectable, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * Define password.
 */
@Component({
	selector: 'passwordsInput',
	templateUrl: 'passwordsInput.component.html',
})
export class PasswordsInputComponent {
	@Input()
	title: string;

	passwordControl = new FormControl(undefined);

	confirmPasswordControl = new FormControl(undefined);

	constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string,
		public dialogRef: MatDialogRef<PasswordsInputComponent>) {
		this.title = data.title;
	}

	confirm(): void {
		this.dialogRef.close(this.passwordControl.value);
	}

	cancel(): void {
		this.dialogRef.close();
	}

	get saveEnabled(): boolean {
		return this.passwordControl.value === this.confirmPasswordControl.value && this.passwordControl.dirty && this.confirmPasswordControl.dirty;
	}
}

/**
 * Defining password in a dialog
 */
@Injectable()
export class PasswordsInputService {
	constructor(private dialog: MatDialog) { }

	open(title: string): Observable<string> {
		const modalRef = this.dialog.open(PasswordsInputComponent, { width: '40em', data: { title: title } });
		return modalRef.afterClosed();
	}
}
