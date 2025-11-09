import { Component, Inject, Injectable, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { DIALOG_ACTIONS_ALIGN } from 'nmce';
import { Observable } from 'rxjs';

export interface EmailListDialog {
	open(data?: any): Observable<string[]>;
}

export interface EmailMessage {
	to?: string;
	cc?: string;
	bcc?: string;
	subject?: string;
	body?: string;
	isHtml?: boolean;
}


/**
 * Edit predefined Email parameters and confirm.
 * If Email message body is HTML, a HTML editor is used. Images are embedded inside HTML.
 */
@Component({
    selector: 'email-confirm',
    templateUrl: 'emailConfirm.component.html',
    standalone: true,
	imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, FormsModule, ReactiveFormsModule,
		AngularEditorModule,
	]
})
export class EmailConfirmComponent {
	ccEnabled = false;
	bccEnabled = false;

	emailAddressesDialogService: EmailListDialog;

	private _emailMessage: EmailMessage;
	@Input()
	get emailMessage(): EmailMessage {
		return this._emailMessage;
	}
	set emailMessage(v: EmailMessage) {
		this._emailMessage = v;
	}

	callbackData: any;

	/**
	 * uploadUrl is expected to be undefined, so images are embedded inside HTML.
	 */
	config: AngularEditorConfig = {
		toolbarPosition: 'top',
		editable: true,
		spellcheck: true,
		height: 'auto', // (this.viewPortHeight * .90 - 150).toString() + 'px',
		maxHeight: 'auto',
		minHeight: '10em',
		placeholder: 'Enter text here...',
		translate: 'no',
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

	private _noteControl: FormControl; //init in constructor
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


	constructor(@Inject(MAT_DIALOG_DATA) private data: { emailMessage: EmailMessage, emailAddressesCallback: EmailListDialog, callbackData: any },
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<EmailConfirmComponent>) {

		this.emailMessage = this.data.emailMessage;
		this.emailAddressesDialogService = data.emailAddressesCallback;
		this.callbackData = data.callbackData;

		if (this.emailMessage.isHtml) {
			this.noteControl = new FormControl(this.emailMessage.body);
			this.noteControl.markAsDirty();
		}
	}

	confirm(): void {
		if (this.emailMessage.isHtml) {
			if (this.noteControl.dirty) {
				console.debug('Email content changed.');
				this.emailMessage.body = this.noteControl.value;
			}
		}

		this.dialogRef.close(this.emailMessage);
	}

	pickToAddresses() {
		if (this.emailAddressesDialogService) {
			this.emailAddressesDialogService.open(this.callbackData).subscribe(
				ads => {
					if (ads) {
						if (this.emailMessage.to) {
							ads.unshift(this.emailMessage.to);
						}

						this.emailMessage.to = ads.join(', ');
					}
				}
			);
		}
	}

	pickCcAddresses() {
		if (this.emailAddressesDialogService) {
			this.emailAddressesDialogService.open(this.callbackData).subscribe(
				ads => {
					if (ads) {
						if (this.emailMessage.cc) {
							ads.unshift(this.emailMessage.cc);
						}

						this.emailMessage.cc = ads.join(', ');
					}
				}
			);
		}
	}

	pickBccAddresses() {
		if (this.emailAddressesDialogService) {
			this.emailAddressesDialogService.open(this.callbackData).subscribe(
				ads => {
					if (ads) {
						if (this.emailMessage.bcc) {
							ads.unshift(this.emailMessage.bcc);
						}

						this.emailMessage.bcc = ads.join(', ');
					}
				}
			);
		}
	}
}

/**
 * Display EmailConfirmComponent dialog, and return the modified EmailMessage.
 */
@Injectable({ providedIn: 'root' })
export class EmailConfirmService {
	constructor(private dialog: MatDialog) {
	}

	/**
	 * Open a dialog with predefined Email message
	 * @param emailMessage predefined Email message
	 * @returns the modified Email message. Technically this is pointing to the same object of predefined Email message.
	 */
	open(emailMessage: EmailMessage, emailAddressesCallback?: EmailListDialog): Observable<EmailMessage> {
		const isSmallScreen = window.innerWidth < 640 || window.innerHeight < 640;
		const modalRef = this.dialog.open(EmailConfirmComponent, {
			width: '61em', disableClose: true,
			minWidth: isSmallScreen ? '98vw' : undefined,
			autoFocus: true,
			data: {
				emailMessage: emailMessage,
				emailAddressesCallback: emailAddressesCallback
			}
		});

		return modalRef.afterClosed();
	}

}
