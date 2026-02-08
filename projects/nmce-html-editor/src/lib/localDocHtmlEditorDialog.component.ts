import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AlertService, DIALOG_ACTIONS_ALIGN } from 'nmce';
import { Observable } from 'rxjs';
import { HtmlDocEditorDialogBaseComponent, HTML_EDITOR_UPLOADURL } from './htmlDocEditorDialogBase.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatInputModule } from '@angular/material/input';
/**
 * Display text area for text of consultation to be saved in Local Storage.
 * Different fields will trigger different events which will be further handled.
 * This component is used by multiple functions via different routes, or by HTML tempalte so noteLabel and modelChanged will be used.
 */
@Component({
	templateUrl: './htmlDocEditorDialogBase.directive.html',
	standalone: true,
    styleUrls: ['../../../components-styles/nmce-styles.css', '../../../components-styles/nmce-colors.css', '../../../components-styles/nmce-flex.css'],
	imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule,
		AngularEditorModule,
	]
})
export class LocalDocHtmlEditorDialogComponent extends HtmlDocEditorDialogBaseComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<LocalDocHtmlEditorDialogComponent>,
		@Inject(HTML_EDITOR_UPLOADURL) protected uploadUrl: string | undefined = undefined,
		protected alertService: AlertService,
	) {
		super(data, actionsAlign, dialogRef, data.useUploadUrl ? uploadUrl : undefined, alertService);

		if (data) {
			this.fileId = data.fileId;
			if (this.fileId === '0000') {
				this.fileId = undefined;
			}
		}

		this.noteLabel = data.noteLabel;
	}

	/**
	 * For existing, load; for new, if with letterTemplateId, then use the template to render the data and show html generated;
	 * otherwise, show blank HTML doc.
	 */
	ngOnInit(): void {
		if (this.fileId) {
			this.loadBlobStorage();
			console.debug('Loading doc ' + this.fileId);
		} else {
			this.noteControl.setValue('');
		}

	}

	protected createMeta() {
		const display = this.getPlainDigest(128);
		const meta: { [k: string]: string } = {
			display: display,
		};

		return meta;
	}

	protected saveAndClose() {
		const meta = this.createMeta();
		if (this.fileId) {
			localStorage.setItem(this.fileId, this.noteControl.value);
		}

		this.alertService.success($localize`${this.noteLabel} saved to Local Storage`, true);
		this.dialogRef.close({ fileId: this.fileId, text: this.note, meta: meta });
	}

	protected loadBlobStorage() {
		if (this.fileId) {
			const s = localStorage.getItem(this.fileId);
			this.noteControl.setValue(s);
		}
	}
}

@Injectable({ providedIn: 'root' })
export class LocalDocEditorDialogService {
	constructor(private dialog: MatDialog) { }

	/**
	 * Display HTML document or create new HTML document with a template
	 * @param data
	 */
	open(data: { [k: string]: any }): Observable<{ [k: string]: string }> {
		const modalRef = this.dialog.open(LocalDocHtmlEditorDialogComponent, {
			disableClose: true, //intentional
			autoFocus: false,
			minWidth: '98vw',
			minHeight: '98vh',
			panelClass: 'dialog-full-content-height',
			data: data,
		});

		return modalRef.afterClosed();
	}

}

