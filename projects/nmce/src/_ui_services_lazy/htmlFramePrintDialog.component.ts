import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HtmlPrintFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from '../_ui_services/baseTypes';
import { HtmlBaseDialogService } from '../_ui_services/htmlBaseDialogService';
import { HtmlFrameDialogComponent, HtmlHRefFrameDialogComponent } from '../_ui_services/htmlFrameDialog.component';
import { DialogSize } from '../_ui_services/types';

/**
 * Contain HTML content in iframe, used in HtmlFrameDialogService.
 */
@Component({
	templateUrl: 'htmlFramePrintDialog.component.html',
	styleUrls: ['../nmcestyles.css']
})
export class HtmlFramePrintDialogComponent extends HtmlFrameDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
		public dialogRef: MatDialogRef<HtmlFrameDialogComponent>, private location: Location) {
		super(data, actionsAlign, dialogRef);
	}

	print() {
		if (this.htmlContentElement) {
			HtmlPrintFunc.print(this.htmlContentElement.nativeElement.srcdoc);
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
	styleUrls: ['../nmcestyles.css']
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
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
		public dialogRef: MatDialogRef<HtmlHRefFrameDialogComponent>, 
		protected httpClient: HttpClient, private location: Location,
		protected renderer: Renderer2) {
		super(data, actionsAlign, dialogRef, httpClient, renderer);
	}

	print() {
		if (this.htmlContentElement) {
			HtmlPrintFunc.print(this.htmlContentElement.nativeElement.srcdoc);
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
