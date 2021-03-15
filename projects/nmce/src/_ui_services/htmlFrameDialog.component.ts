import { Component, Injectable, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSize } from './types';
import { HtmlBaseDialogService } from './htmlBaseDialogService';

/**
 * Contain HTML content in iframe, used in HtmlFrameDialogService.
 */
@Component({

	templateUrl: 'htmlFrameDialog.component.html',
})
export class HtmlFrameDialogComponent implements AfterViewInit {
	title: string;

	htmlContent: string;

	useBackButton: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean },
		public dialogRef: MatDialogRef<HtmlFrameDialogComponent>) {
		this.title = data.title;
		this.htmlContent = data.htmlContent;
		this.useBackButton = data.useBackButton;
	}

	/**
	 * iframe element to hold the HTML content
	 */
	@ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	ngAfterViewInit() {
		if (this.htmlContentElement) {
			this.htmlContentElement.nativeElement.srcdoc = this.htmlContent; //this is an async operation, which will override head and body.

			setTimeout(() => {
				this.htmlContentElement?.nativeElement.contentDocument.head.insertAdjacentHTML('beforeend', '<base target="_blank" />');
			}, 300); // Hopefully 300ms is long enough for srcdoc done.
		}
	}
}

/**
 * Contain HTML content loaded from a url, used in HtmlHReflDialogService. If there's an error during loading, the error will be displayed inn the dialog body.
 */
@Component({

	templateUrl: 'htmlFrameDialog.component.html',
})
export class HtmlHRefFrameDialogComponent implements AfterViewInit {
	title: string;

	/**
	 * URL is passed by a service
	 */
	url: string;

	useBackButton: boolean;

	/**
	 * Constructor
	 * @param data If useBackButton=true, the dialog will be 98% width and height of the viewport.
	 * @param dialogRef
	 * @param httpClient
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, url: string, useBackButton: boolean },
		public dialogRef: MatDialogRef<HtmlHRefFrameDialogComponent>, protected httpClient: HttpClient) {
		this.title = data.title;
		this.url = data.url;
		this.useBackButton = this.data.useBackButton;
	}

	/**
	 * HTML placeholder
	 */
	@ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	ngAfterViewInit() {
		this.httpClient.get(this.url, { responseType: 'text' }).subscribe(
			response => {
				if (this.htmlContentElement) {
					this.htmlContentElement.nativeElement.srcdoc = response;
					setTimeout(() => {
						this.htmlContentElement?.nativeElement.contentDocument.head.insertAdjacentHTML('beforeend', '<base target="_blank" />');
					}, 300); // Hopefully 300ms is long enough for srcdoc done.
				}
			},
			(error: HttpErrorResponse | any) => {
				this.title = 'Cannot retrieve ' + this.title;

				let errMsg: string;
				if (error instanceof HttpErrorResponse) {
					if (error.status === 0) {
						if (error.url) {
							const host = new URL(error.url).host;
							errMsg = `No response from backend ${host}. Connection is unavailable.`;
						} else {
							errMsg = `No response from backend. Connection is unavailable.`;
						}
					} else {
						if (error.message) {
							errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
						} else {
							errMsg = `${error.status} - ${error.statusText}`;
						}
					}

					errMsg += error.error ? (' ' + JSON.stringify(error.error)) : '';
				} else {
					errMsg = error.message ? error.message : error.toString();
				}

				this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', errMsg);
			});

	}

}

/**
 * Display HTML content in the iframe of the dialog.
 */
@Injectable()
export class HtmlFrameDialogService extends HtmlBaseDialogService<HtmlFrameDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title: string, htmlContent: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlFrameDialogComponent, data);
	}
}

/**
 * Display HTML content from URL in the iframe of the dialog.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules.
 */
@Injectable()
export class HtmlHRefFrameDialogService extends HtmlBaseDialogService<HtmlHRefFrameDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title: string, url: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlHRefFrameDialogComponent, data);
	}

}
