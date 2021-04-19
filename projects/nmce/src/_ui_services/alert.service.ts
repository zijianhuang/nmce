import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { LogDialogComponent } from './logDialog.component';
import { LogSnackComponent } from './logSnack.component';
import { AlertSubjectMessage } from './types';

/**
 * Similar to JavaScript's alert() function, to display message in a dialog with LogDialogComponent,
 * or optionally a snackbar if message content type is text. 
 * The mesage could be of type info, error, warn and success.
 * Browser console also wirte a copy of the message. The snackBar parameter is effective only when contentType is text.
 * When contentType is html, you MUST make sure the HTML content won't be harming the health of DOM managed by Angular. 
 * For example, a href link without _blank, and malicious codes may damage Angular rendering.
 */
@Injectable()
export class AlertService {
	private subject = new Subject<AlertSubjectMessage>();

	constructor(private snackBarService: MatSnackBar,
		private dialog: MatDialog,
	) {

	}

	/**
	 * Initiate the listening of SubjectMessage. Then redirect the message to either snackbar or dialog. 
	 * This should be called only once in the startup component like the app component.
	 */
	initOnce() {
		this.getMessage().subscribe(message => {
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
					this.snackBarService.openFromComponent(LogSnackComponent, { duration: 3000, data: { message: message } });
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
	success(message: string, snackBar?: boolean, subtitle?: string, contentType: 'text' | 'html' | 'json' = 'text') {
		this.subject.next({ type: 'success', text: message, snackBar: snackBar, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Display info message.
	 * @param message
	 * @param snackBar
	 * @param subtitle
	 * @param contentType
	 */
	info(message: string, snackBar = false, subtitle?: string, contentType: 'text' | 'html' | 'json' = 'text') {
		this.subject.next({ type: 'info', text: message, snackBar: snackBar, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Error message always is displayed in dialog.
	 * @param message
	 * @param subtitle
	 * @param contentType
	 */
	errorMessage(message: string, subtitle?: string, contentType: 'text' | 'html' | 'json' = 'text') {
		this.subject.next({ type: 'error', text: message, snackBar: false, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Warn message always is displayed in dialog.
	 * @param message
	 * @param subtitle
	 * @param contentType
	 */
	warnMessage(message: string, subtitle?: string, contentType: 'text' | 'html' | 'json' = 'text') {
		this.subject.next({ type: 'warning', text: message, snackBar: false, subtitle: subtitle, contentType: contentType });
	}

	/**
	 * Display HttpErrorResponse, text, or object as error.
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

	private errorOrWarning(error: HttpErrorResponse | any, traceLevel: 'success' | 'info' | 'error' | 'warning', snackBar = false, subtitle?: string) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		let contentType: 'text' | 'html' | 'json' = 'text';
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
					errMsg = `No response from backend ${host}. Connection is unavailable.`;
				} else {
					errMsg = `No response from backend. Connection is unavailable.`;
				}
			} else {
				if (error.error) {
					//console.debug('error.error: ' + error.error); // Sometimes if content type is application/json but without charset=UTF-8, error.error is actuall text rather than object, likely because the text contains some invalid character.
					errMsg = contentType === 'json' && (error.error instanceof Object) ? JSON.stringify(error.error, null, '\t') : error.error; // error is actually the response body, while message could be the text wrapper of the response body with some extra thing like Http failure response for https://apsmdngcli.localhost/WebApi/token: 500 OK " \n \n \n \n \n \n \n \n
				} else {
					errMsg = `${error.status} - ${error.statusText}`;
					contentType = 'text';
				}

			}
		} else if (typeof error === 'string') { //not likely need to check instanceof String
			errMsg = error;
			contentType = 'text';
		} else if (error.message) {
			errMsg = error.message;
			contentType = 'text';
		} else {
			errMsg = JSON.stringify(error, null, '\t');
			contentType = 'json';
		}

		this.subject.next({ type: traceLevel, text: errMsg, snackBar: snackBar, contentType: contentType, status: error.status, statusText: error.statusText, subtitle: subtitle });

	}

	private getMessage(): Observable<AlertSubjectMessage> {
		return this.subject.asObservable();
	}

	clear() {
		this.subject.next({ type: undefined, text: undefined });
	}
}
