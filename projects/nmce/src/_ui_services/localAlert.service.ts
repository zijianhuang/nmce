import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertSubjectMessage } from './types';

/**
 * To display in the alert component AlertComponent <alert> which is to be rendered in parent template HTML.
 */
@Injectable()
export class LocalAlertService {
	private subject = new Subject<AlertSubjectMessage>();
	constructor() {

	}

	success(message: string) {
		this.subject.next({ type: 'success', text: message });
	}

	info(message: string) {
		this.subject.next({ type: 'info', text: message });
	}

	error(error: HttpErrorResponse | any) {
		this.handleResponse(error, 'error');
	}

	warn(error: HttpErrorResponse | any) {
		this.handleResponse(error, 'warning');
	}

	response(r: HttpErrorResponse){
		this.handleResponse(r, 'response');
	}

	private handleResponse(error: HttpErrorResponse | any, type: 'success' | 'info' | 'error' | 'warning' | 'response') {
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
			}

			if (error.status === 0) {
				if (error.url){
					const host = new URL(error.url).host;
					errMsg = `No response from backend ${host}. Connection is unavailable.`;	
				}else{
					errMsg = `No response from backend. Connection is unavailable.`;	
				}
			} else {
				if (error.message) {
					errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
				} else {
					errMsg = `${error.status} - ${error.statusText}`;
				}
			}
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		console.debug('contentType: ' + contentType);
		this.subject.next({ type: type, text: errMsg, contentType: contentType });

	}

	getMessage(): Observable<AlertSubjectMessage> {
		return this.subject.asObservable();
	}

	clear() {
		this.subject.next({ type: undefined, text: undefined });
	}
}
