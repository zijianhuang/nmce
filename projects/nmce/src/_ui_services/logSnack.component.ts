import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from '@angular/material/legacy-snack-bar';
import { AlertSubjectMessage } from './types';

/**
 * Display AlertSubjectMessage through rendering MatSnackBar. Generally this is called by alert service.
 */
@Component({
	templateUrl: 'logSnack.component.html',
	styleUrls: ['../styles.css']
})
export class LogSnackComponent {
	message: AlertSubjectMessage;

	get messageType(): string | undefined {
		if (!this.message) {
			return undefined;
		}

		return this.message.type;
	}

	get messageText(): string | undefined{
		if (!this.message) {
			return '';
		}

		return this.message.text;
	}

	constructor(@Inject(MAT_SNACK_BAR_DATA) data: { message: AlertSubjectMessage }) {
		this.message = data.message;
	}
}
