import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, Subscription } from 'rxjs';
import { RootInjectorGuard } from './baseTypes';
import { LogDialogComponent } from './logDialog.component';
import { LogSnackComponent } from './logSnack.component';
import { AlertSubjectMessage, MessageContentType, MessageType } from './types';

/**
 * Similar to JavaScript's alert() function, to display message in a dialog with LogDialogComponent,
 * or optionally a snackbar if the message content type is text with less than 50 bytes, and the message type is success. 
 * The message could be of type info, error, warn and success and response.
 * Browser console also write a copy of the message. The snackBar parameter is effective only when contentType is text.
 * When contentType is html, you MUST make sure the HTML content won't be harming the health of DOM managed by Angular. 
 * For example, a href link without _blank, and malicious codes may damage Angular rendering.
 * While the message has its own text color and background color, however, Angular Material has full control of the background color of the whole snackbar, 
 * since version 15 of the component suite. There's no feasible way to alter the background at runtime.
 */
@Injectable({
	providedIn: 'root',
})
export class AlertService extends RootInjectorGuard {
	private subject = new Subject<AlertSubjectMessage>();

	private initOnceSubscription: Subscription;

	constructor(private snackBarService: MatSnackBar,
		private dialog: MatDialog,
	) {
		super(AlertService);
		console.debug('AlertService Created.')
	}

	/**
	 * Initiate the listening of SubjectMessage. Then redirect the message to either snackbar or dialog. 
	 * This should be called only once in the startup component like the app component.
	 */
	initOnce() {
		if (this.initOnceSubscription) {
			console.error('initOnce is called more than once. Please fix the program.');
			return;
		}

		this.initOnceSubscription = this.getMessage().subscribe(message => {
			if (message && message.text) {
				switch (message.type) {
					case 'success': console.info(message.text); break;
					case 'info': console.info(message.text); break;
					case 'warning': console.warn(message.text); break;
					case 'error': console.error(message.text); break;
					default: console.warn(message.text); break;
				}

				const maxLenForSuccessSnackBar = 50;

				if (message.contentType === 'text' &&
					(message.snackBar || ((message.type === 'success') && message.text.length <= maxLenForSuccessSnackBar && message.snackBar == null))) {
					this.snackBarService.openFromComponent(LogSnackComponent, { 
						duration: 3000, 
						data: { message: message } });
				} else {
					this.dialog.open(LogDialogComponent, {
						data: {
							message: message
						}
					});
				}
			}
		});

		console.debug('AlertService.initOnce(), and listen now.');
	}

	/**
	 * Display success message.
	 * @param message
	 * @param snackBar If not defined and message length is less than 50 and contentType is text, snackBar will be used.
	 * @param subtitle
	 * @param contentType
	 */
	success(message: string, snackBar?: boolean, subtitle?: string, contentType: MessageContentType = 'text') {
		this.subject.next({ type: 'success', text: message, snackBar: snackBar, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Display info message.
	 * @param message
	 * @param snackBar
	 * @param subtitle
	 * @param contentType
	 */
	info(message: string, snackBar = false, subtitle?: string, contentType: MessageContentType = 'text') {
		this.subject.next({ type: 'info', text: message, snackBar: snackBar, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Display HttpErrorResponse, text, or object as error. For object, the display will be JSON with indent.
	 * @param error
	 * @param snackBar
	 * @param subtitle
	 */
	error(error: HttpErrorResponse | any, snackBar = false, subtitle?: string) {
		this.errorOrWarning(error, 'error', snackBar, subtitle);
	}

	/**
	 * Display HttpErrorResponse, text, or object as warn.
	 * @param error
	 * @param snackBar
	 * @param subtitle
	 */
	warn(error: HttpErrorResponse | any, snackBar = false, subtitle?: string) {
		this.errorOrWarning(error, 'warning', snackBar, subtitle);
	}

	notify(message: string, subtitle?: string, contentType: MessageContentType = 'text') {
		this.subject.next({ type: 'notify', text: message, snackBar: false, subtitle: subtitle, contentType: contentType });
	}

	private errorOrWarning(error: HttpErrorResponse | any, traceLevel: MessageType, snackBar = false, subtitle?: string) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		let contentType: MessageContentType = 'text';
		if (error instanceof HttpErrorResponse) {
			let responseContentType = error.headers.get('Content-Type');
			if (!responseContentType) {
				responseContentType = error.headers.get('content-type');
			}

			if (!responseContentType) {
				contentType = 'text';
			} else if (responseContentType.indexOf('html') >= 0) {
				contentType = 'html';
			} else if (responseContentType.indexOf('json') >= 0) {
				contentType = 'json';
			}

			console.debug('now content Type: ' + contentType);

			if (error.status === 0) {
				if (error.url) {
					const host = new URL(error.url).host;
					errMsg = $localize`No response from backend ${host}. Connection is unavailable.`;
				} else {
					errMsg = $localize`No response from backend. Connection is unavailable.`;
				}
			} else {
				if (error.error) {
					errMsg = contentType === 'json' && (error.error instanceof Object) ? JSON.stringify(error.error, null, '\t') : error.error; // error is actually the response body, while message could be the text wrapper of the response body with some extra thing like Http failure response for https://apsmdngcli.localhost/WebApi/token: 500 OK " \n \n \n \n \n \n \n \n
				} else {
					errMsg = `${error.status} - ${error.statusText}`;
					contentType = 'text';
				}

			}
		} else if (typeof error === 'string') { //not likely need to check instanceof String
			errMsg = error;
			contentType = 'text';
		} else {
			errMsg = JSON.stringify(error, null, '\t');
			contentType = 'json';
		}

		this.subject.next({ type: traceLevel, text: errMsg, snackBar: snackBar, contentType: contentType, status: error.status, statusText: error.statusText, subtitle: subtitle });

	}

	/**
	 * Warn message always is displayed in dialog content.
	 * @param message
	 * @param subtitle
	 * @param contentType
	 */
	warnMessage(message: string, subtitle?: string, contentType: MessageContentType = 'text') {
		this.subject.next({ type: 'warning', text: message, snackBar: false, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Error message always is displayed in dialog content.
	 * @param message
	 * @param subtitle
	 * @param contentType
	 */
	errorMessage(message: string, subtitle?: string, contentType: MessageContentType = 'text') {
		this.subject.next({ type: 'error', text: message, snackBar: false, subtitle: subtitle, contentType: contentType });
	}

	private getMessage(): Observable<AlertSubjectMessage> {
		return this.subject.asObservable();
	}

	clear() {
		this.subject.next({ type: undefined, text: undefined });
	}
}
