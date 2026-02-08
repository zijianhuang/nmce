import { Component, ElementRef, Inject, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { HtmlBaseDialogService } from './htmlBaseDialogService';
import { DialogSize } from './types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'html-img-dialog',
    templateUrl: 'htmlImgDialog.component.html',
    styleUrls: ['../../../components-styles/nmce-styles.css', '../../../components-styles/nmce-colors.css', '../../../components-styles/nmce-flex.css'],
    standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule, FormsModule, CommonModule]
})
export class HtmlImgDialogComponent {
	title: string;

	imageUrl: string | SafeUrl;

	useBackButton: boolean;
	toConfirm?: boolean;
	yes?: string;
	no?: string;

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
		@Inject(MAT_DIALOG_DATA) public data: { title: string, imageUrl: string | SafeUrl, useBackButton: boolean, toConfirm?: boolean, yes?: string, no?: string },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<HtmlImgDialogComponent>) {
		this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.useBackButton = data.useBackButton;
		this.toConfirm=data.toConfirm;
		this.yes=data.yes;
		this.no=data.no;
		console.debug('HtmlImgDialogComponent created with ' + this.imageUrl);

		const s = sessionStorage['HtmlImgDialogComponent.scaleToWidth'];
		this._scaleToWidth = (s == null) || s === 'true';
	}

	confirm(){
		this.dialogRef.close(true);
	}
}

/**
 * Display image with option scale to fit width or original resolution.
 *
 */
@Injectable({ providedIn: 'root' })
export class HtmlImgDialogService extends HtmlBaseDialogService<HtmlImgDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param imageUrl html content to be rendered in the dialog body
	*/
	open(data: { title?: string, imageUrl?: string | SafeUrl, size?: DialogSize, useBackButton?: boolean, toConfirm?: boolean, yes?: string, no?: string }): Observable<any> {
		return super.displayComponent(HtmlImgDialogComponent, data);
	}
}

