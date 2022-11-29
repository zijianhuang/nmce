import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';
import { TextEditorDialogComponentBase } from '../_ui_services/textEditorDialogBase.component';
import { AlertService } from '../_ui_services/alert.service';

/**
 * Display text area for text of consultation to be saved in Azure Blob Storage.
 * Different fields will trigger different events which will be further handled.
 * This component is used by multiple functions via different routes, or by HTML tempalte so noteLabel and modelChanged will be used.
 */
@Component({
	templateUrl: '../_ui_services/textEditorDialogBase.component.html',
})
export class LocalTextEditorDialogComponent extends TextEditorDialogComponentBase implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { [k: string]: string },
		public dialogRef: MatDialogRef<LocalTextEditorDialogComponent>,
		protected alertService: AlertService,
	) {
		super(data, dialogRef, alertService);

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

	protected createMeta(): { [k: string]: string } | undefined {
		return undefined;
	}

	protected saveToBlobStorage(callback?: () => void) {
		const meta = this.createMeta();
		if (this.fileId) {
			localStorage.setItem(this.fileId, this.noteControl.value);
			this.alertService.success(this.noteLabel + ' saved to Local Storage', true);
			if (callback) {
				callback();
			}
		}
	}

	protected loadBlobStorage() {
		if (this.fileId) {
			const s = localStorage.getItem(this.fileId);
			this.noteControl.setValue(s);
		}
	}
}

@Injectable()
export class LocalTextEditorDialogService {
	constructor(private dialog: MatDialog) { }

	/**
	 * Display HTML document or create new HTML document with a template
	 * @param data Should contain noteLabel
	 */
	open(data: { [k: string]: string }): Observable<{ [k: string]: string }> {
		const modalRef = this.dialog.open(LocalTextEditorDialogComponent, {
			disableClose: true,
			autoFocus: false,
			minWidth: '98vw',
			minHeight: '98vh',
			panelClass: 'dialog-full-content-height',
			data: data,
		});

		return modalRef.afterClosed();
	}

}

