import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UuidFunc } from 'nmce-func';
import { AlertService } from './alert.service';

/**
 * Display text area for text to be saved in Azure Blob Storage.
 * Different fields will trigger different events which will be further handled.
 * This component is used by multiple functions via different routes, or by HTML tempalte so noteLabel and modelChanged will be used.
 */
@Directive()
export abstract class TextEditorDialogComponentBase implements AfterViewInit {
	get note(): string {
		if (!this.noteControl) {
			return '';
		}

		return this.noteControl.value;
	}

	private _noteControl: FormControl = new FormControl();
	get noteControl(): FormControl {
		return this._noteControl;
	}
	set noteControl(v: FormControl) {
		this._noteControl = v;
	}

	get modified(): boolean {
		if (!this.noteControl) {
			return false;
		}

		return this.noteControl.dirty;
	}

	@Input()
	noteLabel?: string;

	@Output()
	modelChanged: EventEmitter<string> = new EventEmitter<string>();

	fileId?: string;

	readonly = false;

	@ViewChild('textDetail', { static: false }) noteInput?: ElementRef;

	private viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	maxRows = (this.viewPortHeight * .90 - 150) / 16;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
		public dialogRef: MatDialogRef<TextEditorDialogComponentBase>,
		protected alertService: AlertService,
	) {
	}

	ngAfterViewInit() {
		this.focus();
	}

	private focus() {
		if (!this.readonly && this.noteInput) {
			(this.noteInput.nativeElement as HTMLTextAreaElement).focus();
			console.debug('textDetail should have focus here now.');
		}
	}

	save() {
		if (!this.note) {
			this.alertService.warn('Not allow to save empty document.');
			return;
		}

		if (!this.fileId) {
			this.fileId = UuidFunc.newUUID();
		}

		this.saveToBlobStorage(() => {
			this.dialogRef.close({ fileId: this.fileId, text: this.note });
		});

	}

	protected abstract createMeta(): { [k: string]: string } | undefined;

	protected abstract saveToBlobStorage(callback?: () => void) : void;

	protected abstract loadBlobStorage(fileId: string): void;

	reset() {
		if (this.fileId) {
			this.loadBlobStorage(this.fileId);
		} else {
			this.noteControl.setValue(undefined);
		}

		this.noteControl.markAsPristine();
	}

	close() {
		this.dialogRef.close(undefined);
	}
}

