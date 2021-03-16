import { Component, Injectable, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSize } from '../_ui_services/types';
import { HtmlBaseDialogService } from '../_ui_services/htmlBaseDialogService';
import { HtmlFrameDialogComponent, HtmlHRefFrameDialogComponent } from '../_ui_services/htmlFrameDialog.component';
import { HtmlFunc } from 'nmce-func';
/**
 * Contain HTML content in iframe, used in HtmlFrameDialogService.
 */
@Component({
	templateUrl: 'htmlFramePrintDialog.component.html',
})
export class HtmlFramePrintDialogComponent extends HtmlFrameDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean },
		public dialogRef: MatDialogRef<HtmlFrameDialogComponent>, private location: Location) {
		super(data, dialogRef);
	}

	print() {
		if (this.htmlContentElement) {
			HtmlFunc.print(this.htmlContentElement.nativeElement.srcdoc);
		} else {
			console.error('this.htmlContentElement does not exist.')
		}
	}
}
/**
 * Contain HTML content loaded from a url, used in HtmlHReflDialogService. If there's an error during loading, the error will be displayed inn the dialog body.
 */
@Component({
	templateUrl: 'htmlFramePrintDialog.component.html',
})
export class HtmlHRefFramePrintDialogComponent extends HtmlHRefFrameDialogComponent {
	/**
	 * Constructor
	 * @param data If useBackButton=true, the dialog will be 98% width and height of the viewport.
	 * @param dialogRef
	 * @param httpClient
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, url: string, useBackButton: boolean },
		public dialogRef: MatDialogRef<HtmlHRefFrameDialogComponent>, protected httpClient: HttpClient, private location: Location) {
		super(data, dialogRef, httpClient);
	}

	print() {
		if (this.htmlContentElement) {
			HtmlFunc.print(this.htmlContentElement.nativeElement.srcdoc);
		} else {
			console.error('this.htmlContentElement does not exist.')
		}
	}

}

/**
 * Display HTML content in the iframe of the dialog.
 */
@Injectable()
export class HtmlFramePrintDialogService extends HtmlBaseDialogService<HtmlFramePrintDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title: string, htmlContent: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlFramePrintDialogComponent, data);
	}
}

/**
 * Display HTML content from URL in the iframe of the dialog.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules.
 */
@Injectable()
export class HtmlHRefFramePrintDialogService extends HtmlBaseDialogService<HtmlHRefFramePrintDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title: string, url: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlHRefFramePrintDialogComponent, data);
	}

}
