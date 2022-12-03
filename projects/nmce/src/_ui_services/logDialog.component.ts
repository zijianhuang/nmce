import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

	// get isHtmlOrJson(): boolean {
	// 	if (this.message) {
	// 		return this.message && (this.message.contentType === 'html' || this.message.contentType === 'json');
	// 	}

	// 	return false;
	// }

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
		if (this.message?.status) {
			this.assignContentToFrame(this._message?.text);
		} else //if (this._message?.contentType === 'json') 
		{
			//this.assignContentToFrame('<pre>' + this._message?.text + '</pre>')
		} //no need for other contentType
	}

	private assignContentToFrame(s?: string) {
		if (this.htmlContentElement) {
			this.htmlContentElement.nativeElement.srcdoc = s; //this is an async operation, which will override head and body.

			setTimeout(() => {
				this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', '<base target="_blank" />');
			}, 300); // Hopefully 300ms is long enough for srcdoc done.
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

		if (this.message.status) {
			return `HTTP Status: ${this.message.status} ${this.message.statusText}`; //then the UI has extra place for http response body.
		} else {
			return this.message.text;
		}
	}

	/**
	 * For HTTP response body
	 */
	get responseBody(): string | undefined{
		if (!this.message) {
			return undefined;
		}

		if (this.message.status){
			return this.message.text;
		}

		if (this.message.text){
			console.warn('What happend: ' + this.message.text);
		}

		return undefined;
	}

}
