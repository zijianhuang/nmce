import { Directive, EventEmitter, Inject, InjectionToken, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertService, DIALOG_ACTIONS_ALIGN } from 'nmce';
import { HtmlPrintFunc, StringFunc, UuidFunc } from 'nmce-func';

export const HTML_EDITOR_UPLOADURL = new InjectionToken<string|undefined>('htmlEditor.uploadUrl', {
	providedIn: 'root',
	factory: () => {
		return undefined;
	}
});

/**
 * Display text area for HTML text.
 * Different fields will trigger different events which will be further handled.
 * if fieldId is defined, load existing doc; if letterTemplateId is defined, create a new doc through mustaches.
 * This component is used by multiple functions via different routes, or by HTML tempalte so noteLabel and modelChanged will be used.
 */
@Directive()
export abstract class HtmlDocEditorDialogBaseComponent {
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

	/**
	 * Friendly name
	 */
	@Input()
	noteLabel: string;

	@Output()
	modelChanged: EventEmitter<string> = new EventEmitter<string>();

	fileId: string | undefined;

	readonly = false;

	//private viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	config: AngularEditorConfig;

	/**
	 *
	 * @param data Should contain at least fileId. If fileId is not defined, a new doc is created.
	 * @param dialogRef
	 * @param alertService
	 */
	constructor(@Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
	@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: string, 
	public dialogRef: MatDialogRef<HtmlDocEditorDialogBaseComponent>,
		protected uploadUrl: string | undefined,
		protected alertService: AlertService,
	) {
		console.debug('uploadUrl: ' + uploadUrl);
		this.config = {
			toolbarPosition: 'top',
			editable: true,
			spellcheck: true,
			height: 'auto', // (this.viewPortHeight * .90 - 150).toString() + 'px',
			maxHeight: 'auto',
			minHeight: '10em',
			placeholder: 'Enter text here...',
			translate: 'no',
			sanitize: true,
			uploadUrl: uploadUrl,
			customClasses: [
				{
					name: 'quote',
					class: 'quote',
				},
				{
					name: 'redText',
					class: 'redText'
				},
				{
					name: 'titleText',
					class: 'titleText',
					tag: 'h1',
				},
			]
		};
	}

	/**
	 * The sub string of HTML plain context. Derived classes may use this to produce a friendly name of the HTML doc.
	 * @param len
	 */
	protected getPlainDigest(len: number) {
		const s = StringFunc.getOneLineDigestOfHtml(StringFunc.getHtmlPlainText(this.noteControl.value), len);
		return s ? s : 'Empty Text';
	};

	save() {
		if (!this.noteControl.value) {
			this.alertService.warn('Not allow to save empty document.');
			return;
		}


		if (!this.fileId) {
			this.fileId = UuidFunc.newUUID();
		}

		this.saveAndClose();
	}

	/**
	 * The implementation should persist and close the dialog in order to return a new UUID.
	 */
	protected abstract saveAndClose(): void;

	/**
	 * Meta should contain field display which should generally be a digest of the HTML content.
	 */
	protected abstract createMeta(): { [k: string]: string };

	/**
	 * Load data from Azure cloud into noteControl
	 * @param fileId
	 */
	protected abstract loadBlobStorage(fileId: string): void;

	reset() {
		if (this.fileId) {
			this.loadBlobStorage(this.fileId);
		} else {
			this.noteControl.setValue('');
		}

		this.noteControl.markAsPristine();
	}

	close() {
		this.dialogRef.close(undefined);
	}

	print() {
		if (!this.noteControl.value) {
			this.alertService.warn('Not allow to print empty document.');
			return;
		}

		HtmlPrintFunc.print(this.noteControl.value);
	}
}

