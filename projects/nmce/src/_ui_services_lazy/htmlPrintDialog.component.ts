import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { HtmlPrintFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from '../_ui_services/baseTypes';
import { HtmlBaseDialogService } from '../_ui_services/htmlBaseDialogService';
import { HtmlDialogComponent, HtmlHRefDialogComponent, HtmlImgDialogComponent } from '../_ui_services/htmlDialog.component';
import { DialogSize } from '../_ui_services/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

/**
 * Contain HTML content, used in HtmlDialogService.
 */
@Component({
    selector: 'html-print-dialog',
    templateUrl: 'htmlPrintDialog.component.html',
    styleUrls: ['../nmcestyles.css'],
     standalone: true,
	imports: [MatButtonModule,MatDialogModule, CommonModule, MatIconModule, MatCheckboxModule, FormsModule]
})
export class HtmlPrintDialogComponent extends HtmlDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<HtmlDialogComponent>, private location: Location, @Inject('print.cssUrl') private cssUrl: string,
		protected renderer: Renderer2) {
		super(data, actionsAlign, dialogRef, renderer);
	}

	print() {
		if (this.htmlContent) {
			//HtmlPrintFunc.printWithCSS(this.htmlContentElement.nativeElement.innerHTML, this.location.prepareExternalUrl(this.cssUrl));
			HtmlPrintFunc.printWithCSS(this.htmlContent, this.location.prepareExternalUrl(this.cssUrl));
		} else {
			console.error($localize`this.htmlContentElement does not exist.`);
		}
	}
}

/**
 * Contain HTML content loaded from a url, used in HtmlHReflDialogService. If there's an error during loading, the error will be displayed inn the dialog body.
 */
@Component({
    selector: 'html-href-print-dialog',
    templateUrl: 'htmlPrintDialog.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: true,
	imports: [MatButtonModule,MatDialogModule, CommonModule, MatIconModule, MatCheckboxModule, FormsModule]
})
export class HtmlHRefPrintDialogComponent extends HtmlHRefDialogComponent {
	/**
	 * Constructor
	 * @param data If useBackButton=true, the dialog will be 98% width and height of the viewport.
	 * @param dialogRef
	 * @param httpClient
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, url: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<HtmlHRefDialogComponent>, protected httpClient: HttpClient, private location: Location,
		protected renderer: Renderer2) {
		super(data, actionsAlign, dialogRef, httpClient, renderer);
	}

	print() {
		if (this.htmlContent) {
			HtmlPrintFunc.print(this.htmlContent);
		} else {
			console.error($localize`this.htmlContentElement does not exist.`);
		}
	}

}

@Component({
    selector: 'html-img-print-dialog',
    templateUrl: 'htmlImgPrintDialog.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: true,
	imports: [MatButtonModule,MatDialogModule, CommonModule, MatIconModule, MatCheckboxModule, FormsModule]
})
export class HtmlImgPrintDialogComponent extends HtmlImgDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, imageUrl: string | SafeUrl, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<HtmlImgDialogComponent>, private location: Location, @Inject('print.cssUrl') private cssUrl: string) {
		super(data, actionsAlign, dialogRef);
	}

	print() {
		if (this.htmlContentElement) {
			HtmlPrintFunc.printWithCSS(this.htmlContentElement.nativeElement.innerHTML, this.location.prepareExternalUrl(this.cssUrl));
		} else {
			console.error($localize`this.htmlContentElement does not exist.`);
		}
	}
}


/**
 * Display HTML content in the dialog.
 */
@Injectable({ providedIn: 'root' })
export class HtmlPrintDialogService extends HtmlBaseDialogService<HtmlPrintDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title: string, htmlContent: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlPrintDialogComponent, data);
	}
}

/**
 * Display HTML content from URL in the dialog.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules.
 */
@Injectable({ providedIn: 'root' })
export class HtmlHRefPrintDialogService extends HtmlBaseDialogService<HtmlHRefPrintDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title: string, url: string, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlHRefPrintDialogComponent, data);
	}

}

@Injectable({ providedIn: 'root' })
export class HtmlImgPrintDialogService extends HtmlBaseDialogService<HtmlImgPrintDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title: string, imageUrl: string | SafeUrl, size: DialogSize, useBackButton?: boolean }): Observable<any> {
		return super.displayComponent(HtmlImgPrintDialogComponent, data);
	}
}

