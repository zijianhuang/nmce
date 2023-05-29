import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, Injectable, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { HtmlBaseDialogService } from './htmlBaseDialogService';
import { DialogSize } from './types';

/**
 * Contain HTML content, used in HtmlDialogService.
 * The content is contained inside another html tag, and all href linkes will be opened in new browser tab.
 */
@Component({
	selector: 'html-dialog',
	templateUrl: 'htmlDialog.component.html',
})
export class HtmlDialogComponent implements AfterViewInit {
	title: string;

	htmlContent: string;

	useBackButton: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
		public dialogRef: MatDialogRef<HtmlDialogComponent>,
		protected renderer: Renderer2) {
		this.title = data.title;
		this.htmlContent = data.htmlContent;
		this.useBackButton = data.useBackButton;
	}

	// @ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	ngAfterViewInit() {
		//this.renderer.setProperty(this.htmlContentElement?.nativeElement, 'innerHTML', this.htmlContent);working
		//this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', this.htmlContent);working
	}

}

/**
 * Contain HTML content loaded from a url, used in HtmlHReflDialogService. If there's an error during loading, the error will be displayed n the dialog body.
 */
@Component({
	selector: 'html-ref-dialog',
	templateUrl: 'htmlDialog.component.html',
})
export class HtmlHRefDialogComponent implements AfterViewInit {
	title: string;

	/**
	 * URL is passed by a service
	 */
	url: string;

	useBackButton: boolean;

	htmlContent: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) protected data: { title: string, url: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
		public dialogRef: MatDialogRef<HtmlHRefDialogComponent>, protected httpClient: HttpClient,
		protected renderer: Renderer2) {
		this.title = data.title;
		this.url = data.url;
		this.useBackButton = data.useBackButton;
	}

	// /**
	//  * HTML placeholder
	//  */
	// @ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	ngAfterViewInit() {
		this.httpClient.get(this.url, { responseType: 'text' }).subscribe(
			response => {
				this.htmlContent = response;
				//this.renderer.setProperty(this.htmlContentElement?.nativeElement, 'innerHTML', response);
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
							errMsg = `No response from backend. Connection is unavailable.`
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

				this.htmlContent=errMsg;
				// this.renderer.setProperty(this.htmlContentElement?.nativeElement, 'innerHTML', errMsg);
			});

	}

}

@Component({
	selector: 'html-img-dialog',
	templateUrl: 'htmlImgDialog.component.html',
	styleUrls:['../nmcestyles.css']
})
export class HtmlImgDialogComponent {
	title: string;

	imageUrl: string | SafeUrl;

	useBackButton: boolean;

	private _scaleToWidth = true;
	/**
	 * Default true. value persisted with sessionStorage.
	 */
	get scaleToWidth() {
		return this._scaleToWidth;
	}
	set scaleToWidth(v: boolean) {
		this._scaleToWidth = v;
		sessionStorage['HtmlImgDialogComponent.scaleToWidth'] = v ? 'true' : 'false';
	}

	@ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, imageUrl: string | SafeUrl, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
		public dialogRef: MatDialogRef<HtmlImgDialogComponent>) {
		this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.useBackButton = data.useBackButton;
		console.debug('HtmlImgDialogComponent created with ' + this.imageUrl);

		const s = sessionStorage['HtmlImgDialogComponent.scaleToWidth'];
		this._scaleToWidth = (s == null) || s === 'true';
	}
}



/**
 * Display HTML content in a dialog.  Use this only when you are sure the HTML content does not contain naughty styling that could do graffiti all over the NG2 page.
 */
@Injectable()
export class HtmlDialogService extends HtmlBaseDialogService<HtmlDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title?: string, htmlContent?: string, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlDialogComponent, data);
	}
}

/**
 * Display HTML content from URL in a dialog. Use this only when you are sure the HTML content does not contain naughty styling that could  do graffiti all over the NG2 page.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules; and then various warnings or errors may be appearing
 * in browser console because of missing resources or confliciting stylings.
 * Warning: You should provide url which will not return HTML that may jeopardize the health of the Angular SPA. If you really want to show a random but not too malicious Web page inside the SPA,
 * you may use HtmlHRefFrameDialogService which will put the Web content inside a frame.
 */
@Injectable()
export class HtmlHRefDialogService extends HtmlBaseDialogService<HtmlHRefDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title?: string, url?: string, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlHRefDialogComponent, data);
	}
}

/**
 * Display image with option scale to fit width or original resolution.
 *
 */
@Injectable()
export class HtmlImgDialogService extends HtmlBaseDialogService<HtmlImgDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param imageUrl html content to be rendered in the dialog body
	*/
	open(data: { title?: string, imageUrl?: string | SafeUrl, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlImgDialogComponent, data);
	}
}

