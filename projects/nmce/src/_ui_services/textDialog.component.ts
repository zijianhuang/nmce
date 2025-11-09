import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogSize, DialogSizeToSize } from '../_ui_services/types';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Contain HTML content, used in TextDialogService.
 */
@Component({
	selector: 'text-dialog',
	templateUrl: 'textDialog.component.html',
	styleUrls: ['../nmcestyles.css'],
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule]
})
export class TextDialogComponent implements AfterViewInit {
	title: string;

	lines: string;

	useBackButton: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string, lines: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<TextDialogComponent>) {
		this.title = data.title;
		this.lines = data.lines;
		this.useBackButton = data.useBackButton;
	}

	@ViewChild('htmlContent', { static: false }) htmlContentElement: ElementRef;

	ngAfterViewInit() {
		this.htmlContentElement.nativeElement.insertAdjacentHTML('beforeend', this.lines);
	}

	//close(): void {
	//    this.dialogRef.close();
	//}
}

/**
 * Display text as HTML pre in a dialog, which is loaded from a url, used in TextHReflDialogService. If there's an error during loading, the error will be displayed n the dialog body.
 */
@Component({
	selector: 'text-href-dialog',
	templateUrl: 'textDialog.component.html',
	styleUrls: ['../nmcestyles.css'],
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule,]
})
export class TextHRefDialogComponent implements AfterViewInit {
	title: string;

	/**
	 * URL is passed by a service
	 */
	url: string;

	useBackButton: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) data: { title: string, url: string, useBackButton: boolean },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<TextDialogComponent>, private httpClient: HttpClient) {
		this.title = data.title;
		this.url = data.url;
		this.useBackButton = data.useBackButton;
	}

	/**
	 * HTML placeholder
	 */
	@ViewChild('htmlContent', { static: false }) htmlContentElement?: ElementRef;

	ngAfterViewInit() {
		this.httpClient.get(this.url, { responseType: 'text' }).subscribe(
			response => {
				this.htmlContentElement?.nativeElement.insertAdjacentHTML('beforeend', response);
			},
			(error: HttpErrorResponse | any) => {
				this.title = 'Cannot retrieve ' + this.title;

				let errMsg: string;
				if (error instanceof HttpErrorResponse) {
					if (error.status === 0) {
						if (error.url) {
							const host = new URL(error.url).host;
							errMsg = $localize`No response from backend ${host}. Connection is unavailable.`;
						} else {
							errMsg = $localize`No response from backend. Connection is unavailable.`;
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
 * Display text as HTML pre in a dialog
 */
@Injectable({ providedIn: 'root' })
export class TextDialogService {
	constructor(private dialog: MatDialog) { }

	modalRef?: MatDialogRef<TextDialogComponent>;

	/**
	* Display html content in a dialog
	* @param title title of the dialog
	* @param lines html content to be rendered in the dialog body
	*/
	open(data: { title?: string, lines?: string, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 800 || window.innerHeight < 800;
		if (data.useBackButton == null) {
			if (data.size === DialogSize.Large) {
				data.useBackButton = true;
			} else {
				data.useBackButton = isSmallScreen;
			}
		}

		this.modalRef = this.dialog.open(TextDialogComponent, {
			disableClose: true,
			minWidth: DialogSizeToSize(data.size, data.useBackButton, 'vw'),
			minHeight: DialogSizeToSize(data.size, data.useBackButton, 'vh'),
			panelClass: (data.size === DialogSize.Large) ? 'dialog-full-content-height' : undefined,
			data: data,
		});

		return this.modalRef.afterClosed();
	}
}

/**
 * Display HTML content from URL in a dialog.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules.
 */
@Injectable({ providedIn: 'root' })
export class TextHReflDialogService {
	constructor(private dialog: MatDialog) { }

	modalRef?: MatDialogRef<TextHRefDialogComponent>;

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title?: string, url?: string, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 800 || window.innerHeight < 800;
		if (data.useBackButton == null) {
			if (data.size === DialogSize.Large) {
				data.useBackButton = true;
			} else {
				data.useBackButton = isSmallScreen;
			}
		}

		this.modalRef = this.dialog.open(TextHRefDialogComponent, {
			disableClose: true,
			minWidth: DialogSizeToSize(data.size, data.useBackButton, 'vw'),
			minHeight: DialogSizeToSize(data.size, data.useBackButton, 'vh'),
			panelClass: (data.size === DialogSize.Large) ? 'dialog-full-content-height' : undefined,
			data: data,
		});

		return this.modalRef.afterClosed();
	}
}
