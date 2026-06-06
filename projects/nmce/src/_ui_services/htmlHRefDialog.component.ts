import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Injectable, OnInit, Renderer2, SecurityContext, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { HtmlBaseDialogService } from './htmlBaseDialogService';
import { DialogSize } from './types';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Contain HTML content loaded from a url, used in HtmlHReflDialogService. If there's an error during loading, the error will be displayed n the dialog body.
 */
@Component({
	selector: 'html-ref-dialog',
	templateUrl: 'htmlDialog.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule]
})
export class HtmlHRefDialogComponent implements AfterViewInit, OnInit {
	title: string;
	@ViewChild('htmlContent', {static: true}) htmlContentRef?: ElementRef;
	/**
	 * URL is passed by a service
	 */
	url: string;

	useBackButton: boolean;
	toConfirm?: boolean;
	yes?: string;
	no?: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) protected data: { title: string, url: string, useBackButton: boolean, toConfirm?: boolean, yes?: string, no?: string },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<HtmlHRefDialogComponent>, protected httpClient: HttpClient,
		protected renderer: Renderer2,
		protected sanitizer: DomSanitizer,
		protected ref: ChangeDetectorRef,) {
		this.title = data.title;
		this.url = data.url;
		this.useBackButton = data.useBackButton;
		this.toConfirm = data.toConfirm;
		this.yes = data.yes;
		this.no = data.no;
	}

	ngOnInit(): void {
		this.httpClient.get(this.url, { responseType: 'text' }).subscribe({
			next: response => {
				this.htmlContentRef!.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, response);
				this.ref.detectChanges();
			},
			error: (error: HttpErrorResponse | any) => {
				this.title = 'Cannot retrieve ' + this.title;

				let errMsg: string;
				if (error instanceof HttpErrorResponse) {
					if (error.status === 0) {
						if (error.url) {
							const host = new URL(error.url).host;
							errMsg = $localize`No response from backend ${host}. Connection is unavailable.`;
						} else {
							errMsg = $localize`No response from backend. Connection is unavailable.`
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

				this.htmlContentRef!.nativeElement.innerHTML = errMsg;
				this.ref.detectChanges();
			}
		});		
	}

	ngAfterViewInit() {
	}

	confirm() {
		this.dialogRef.close(true);
	}
}

/**
 * Display HTML content from URL in a dialog. Use this only when you are sure the HTML content does not contain naughty styling that could  do graffiti all over the NG2 page.
 * If the URL is under the same url root of NG2 app, make sure thee content directory is with a rewrite rule like <add input="{REQUEST_URI}" pattern="^/(content)" negate="true"/>
 * Otherwise if the file is not found, the program may treat the url as a legitimate NG2 route, because of other rewrite rules; and then various warnings or errors may be appearing
 * in browser console because of missing resources or conflicting stylings.
 * Warning: You should provide url which will not return HTML that may jeopardize the health of the Angular SPA. If you really want to show a random but not too malicious Web page inside the SPA,
 * you may use HtmlHRefFrameDialogService which will put the Web content inside a frame.
 */
@Injectable({ providedIn: 'root' })
export class HtmlHRefDialogService extends HtmlBaseDialogService<HtmlHRefDialogComponent> {
	constructor(protected dialog: MatDialog) { super(dialog); }

	/**
	 * Display html from url.  If there's an error during loading, the error will be displayed n the dialog body.
	 * @param title
	 * @param url to be rendered in the dialog body
	 */
	open(data: { title?: string, url?: string, size?: DialogSize, useBackButton?: boolean, toConfirm?: boolean, yes?: string, no?: string }): Observable<any> {
		return super.displayComponent(HtmlHRefDialogComponent, data);
	}
}