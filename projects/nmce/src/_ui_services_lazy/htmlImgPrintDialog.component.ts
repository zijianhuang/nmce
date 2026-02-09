import { CommonModule, Location } from '@angular/common';
import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { HtmlPrintFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from '../_ui_services/baseTypes';
import { HtmlBaseDialogService } from '../_ui_services/htmlBaseDialogService';
import { DialogSize } from '../_ui_services/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HtmlImgDialogComponent } from '../_ui_services/htmlImgDialog.component';

@Component({
    selector: 'html-img-print-dialog',
    templateUrl: 'htmlImgPrintDialog.component.html',
    styleUrls: ['../../../components-styles/nmce-styles.css', '../../../components-styles/nmce-colors.css', '../../../components-styles/nmce-flex.css'],
    standalone: true,
	imports: [MatButtonModule, MatDialogModule, MatIconModule, MatCheckboxModule, FormsModule, CommonModule]
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

