import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * Confirmation through multiple options represented in buttons horizontally.
 */
@Component({
    selector: 'options-content',
    templateUrl: 'options.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: false
})
export class OptionsComponent {
	@Input()
	title: string;

	@Input()
	body: string;

	/**
	 * Options to generate buttons.
	 */
	@Input()
	options: string[];

	/**
	 * Text of the selected button.
	 */
	selected: string;

	constructor(@Inject(MAT_DIALOG_DATA) data: { title: string, body: string, options: string[] },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string,
		private dialogRef: MatDialogRef<OptionsComponent>) {
		this.title = data.title;
		this.body = data.body;
		this.options = data.options;
	}

	/**
	 * Each button is associate with this function, so the button text is passed on to the result of the modal.
	 * @param selected
	 */
	confirm(selected: string): void {
		this.selected = selected;
		this.dialogRef.close(this.selected);
	}

	cancel(): void {
		this.dialogRef.close();
	}
}
