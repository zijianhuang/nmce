import { Component, Inject, Injectable, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * Input one line text.
 */
@Component({
    selector: 'textInput',
    templateUrl: 'textInput.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: false
})
export class TextInputComponent {
	@Input()
	label: string;

	@Input()
	text: string;

	@Input()
	title: string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string, label: string, title: string }, 
	@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
	public dialogRef: MatDialogRef<TextInputComponent>) {
		this.text = data.text;
		this.label = data.label;
		this.title = data.title;
	}

	confirm(): void {
		this.dialogRef.close(this.text);
	}

	cancel(): void {
		this.dialogRef.close(null);
	}
}

/**
 * Display TextInputComponent modal which may give input or TextArea. Null mean cancel.
 */
@Injectable()
export class TextInputService {
	constructor(private dialog: MatDialog) { }

	/**
	 * Return text, or null if the user presses Cancel.
	 * @param title
	 * @param label when not defined, the dialog will give a TextArea
	 * @param text
	 * @param small default size. True to have 98vw.
	 */
	open(title?: string, label?: string, text?: string, small = false): Observable<string> {
		const modalRef = this.dialog.open(TextInputComponent, {
			disableClose: true,
			autoFocus: true,
			minWidth: small ? undefined : '98vw',
			data: {
				text: text,
				label: label,
				title: title
			}
		});

		return modalRef.afterClosed();
	}
}
