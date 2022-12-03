import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Renderer2, ViewChild } from '@angular/core';
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
 * Text message
 * HTML message from app, displayed in HTML container
 * JSON message from app, displayed in HTML container
 * Message from HTTP response, displayed in iFrame, regardless of content Type
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

	/**
	 * @param data
	 * @param dialogRef
	 * @param dialogOptions if not defined, both useTitle and useIcon are false, then useTitle is true.
	 */
	constructor(
		@Inject(LOG_DIALOG_OPTIONS) public dialogOptions: MessageDialogOptions,
		@Inject(MAT_DIALOG_DATA) data: { message: AlertSubjectMessage },
		private renderer: Renderer2,
	) {
		this.message = data.message;
	}

	ngAfterViewInit() {
		if (this.message) {
			console.debug('message text: ' + this.message.text);
			if (this.htmlContentElement) {
				if (this.message.contentType === 'html') {
					if (this.message.status || this.message.status === 0) {
						this.htmlContentElement.nativeElement.srcdoc = this.message.text; //good for iframe
					} else {
						this.renderer.setProperty(this.htmlContentElement.nativeElement, 'innerHTML', this.message.text);
					}

					//this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', this.message.text);//good for normal insert
				} else if (this.message.contentType === 'json') {
					if (this.message.status || this.message.status === 0) {
						this.renderer.setProperty(this.htmlContentElement.nativeElement, 'innerHTML', '<pre>' + this.message.text + '</pre>');
					} else {
						this.htmlContentElement.nativeElement.srcdoc = '<pre>' + this.message.text + '</pre>';
					}
					//this.htmlContentElement.nativeElement.srcdoc = '<pre>' + this.message.text + '</pre>';
					//this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', '<pre>' + this.message.text + '</pre>');
				}
			}
		} else {
			console.error('this.message is not yet available');
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

}
