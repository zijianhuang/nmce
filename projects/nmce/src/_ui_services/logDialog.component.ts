import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, ViewChild } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AlertSubjectMessage } from './types';

export interface MessageDialogOptions {
	useIcon?: boolean;
	useTitle?: boolean;
}

export const LOG_DIALOG_OPTIONS = new InjectionToken<MessageDialogOptions>('Dialog Options', {
	providedIn: 'root',
	factory: () => {
		return { useIcon: false, useTitle: true };
	}
});

/**
 * Display AlertSubjectMessage. Generally this is called by alert service.
 * Whether to show message type icon is determined by MY_DIALOG_OPTIONS generally declared in app.module.ts.
 */
@Component({
	templateUrl: 'logDialog.component.html',
	styleUrls: ['../styles.css']
})
export class LogDialogComponent implements AfterViewInit {

	private _message?: AlertSubjectMessage;
	get message(): AlertSubjectMessage | undefined {
		return this._message;
	}
	set message(v: AlertSubjectMessage | undefined) {
		this._message = v;
	}

	@ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	get isHtmlOrJson(): boolean {
		if (this.message) {
			return this.message && (this.message.contentType === 'html' || this.message.contentType === 'json');
		}

		return false;
	}

	/**
	 * @param data
	 * @param dialogRef
	 * @param dialogOptions if not defined, both useTitle and useIcon are false, then useTitle is true.
	 */
	constructor(
		@Inject(LOG_DIALOG_OPTIONS) public dialogOptions: MessageDialogOptions,
		@Inject(MAT_DIALOG_DATA) data: { message: AlertSubjectMessage },
	) {
		this.message = data.message;
	}

	ngAfterViewInit() {
		if (this._message?.contentType === 'html') {
			this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', this._message?.text);
		} else if (this._message?.contentType === 'json') {
			this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', '<pre>' + this._message?.text + '</pre>');
		}
	}

	get title(): string | undefined {
		if (this.message) {
			switch (this.message.type) {
				case 'success': return 'Success';
				case 'info': return 'Info';
				case 'warning': return 'Warning';
				case 'error': return 'Error';
				default: return 'Info';
			}
		}

		return undefined;
	}

	get titleIcon(): string | undefined {
		if (this.message) {
			const iconMapping = {
				'info': 'info',
				'success': 'star',
				'warning': 'warning',
				'error': 'error',
				'response': 'chat'
			}

			return this.message.type ? iconMapping[this.message.type] : undefined;
		}

		return undefined;
	}

	get iconColor(): string | undefined {
		if (this.message) {
			const colorMapping = {
				'info': 'primary',
				'success': 'primary',
				'warning': 'accent',
				'error': 'warn',
				'response': 'primary'
			}

			return this.message.type ? colorMapping[this.message.type] : undefined;
		}

		return undefined;
	}

	get useIcon(): boolean | undefined {
		return this.dialogOptions && this.dialogOptions.useIcon
	}

	get useTitle(): boolean {
		return (this.dialogOptions && this.dialogOptions.useTitle) || !this.dialogOptions || (!this.dialogOptions.useIcon && !this.dialogOptions.useTitle);
	}

	get subtitle(): string | undefined {
		return this.message?.subtitle;
	}

	get messageType(): string {
		if (!this.message) {
			return '';
		}

		return this.message.type ?? '';
	}

	get messageText(): string | undefined {
		if (!this.message) {
			return undefined;
		}

		if ((this.message.type === 'error' || this.message.type === 'warning') && this.message.status) {
			return this.isHtmlOrJson ? `HTTP Status: ${this.message.status} ${this.message.statusText}` : this.message.text;
		} else {
			return this.isHtmlOrJson ? '' : this.message.text;
		}
	}

}
