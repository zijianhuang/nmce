import { Component, Inject, Injectable, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { HtmlBaseDialogService } from './htmlBaseDialogService';
import { DialogSize } from './types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Contain HTML content, used in HtmlDialogService.
 * The content is contained inside another html tag, and all href linkes will be opened in new browser tab.
 */
@Component({
    selector: 'html-dialog',
    templateUrl: 'htmlDialog.component.html',
    standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule, FormsModule]
})
export class HtmlDialogComponent {
	title: string;

	htmlContent: string;

	useBackButton: boolean;
	toConfirm?: boolean;
	yes?: string;
	no?: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string, useBackButton: boolean, toConfirm?: boolean, yes?: string, no?: string },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<HtmlDialogComponent>,
		protected renderer: Renderer2) {
		this.title = data.title;
		this.htmlContent = data.htmlContent;
		this.useBackButton = data.useBackButton;
		this.toConfirm=data.toConfirm;
		this.yes=data.yes;
		this.no=data.no;
	}

	confirm(){
		this.dialogRef.close(true);
	}
}

/**
 * Display HTML content in a dialog.  Use this only when you are sure the HTML content does not contain naughty styling that could do graffiti all over the NG2 page.
 */
@Injectable({ providedIn: 'root' })
export class HtmlDialogService extends HtmlBaseDialogService<HtmlDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param htmlContent html content to be rendered in the dialog body
	*/
	open(data: { title?: string, htmlContent?: string, size?: DialogSize, useBackButton?: boolean, toConfirm?: boolean, yes?: string, no?: string }): Observable<any> {
		return super.displayComponent(HtmlDialogComponent, data);
	}
}
