import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	AlertService,
	ConfirmService, DateHourRangePickerService, DateRangePickerService, DialogSize, HtmlFramePrintDialogService, LocalTextEditorDialogService, OptionListDialogService, OptionsService,
	PasswordsInputService, TextDialogService, TextInputService,

	TimeService
} from 'nmce';
import { EmailConfirmService, LocalDocEditorDialogService } from 'nmce-html-editor';



/**
 * Fill up the user registration form and register. Then roles checkboxes will appear.
 * and the Register button may become disabled when the user is just registered.
 */
@Component({
    templateUrl: 'inputDialogs.component.html',
    standalone: false
})
export class InputDialogsComponent implements OnInit {
	loading = false;
	userId: string;
	submitted: boolean;

	dialogSelectedControl: FormControl = new FormControl(1);
	dialogSelectedControlForHtml: FormControl = new FormControl(1);
	dialogSelectedControlForJson: FormControl = new FormControl(1);
	dialogSelectedControlForError: FormControl = new FormControl(1);
	snackBar: boolean | undefined = undefined;
	showSnackBarCheckbox = true;

	startDate: Date;
	endDate: Date;

	isHtml = true;

	useUploadUrl = true;

	get confirmDialogOpened() {
		return this.confirmService.opened;
	}

	confirmDialogConfirmed = false;

	htmlFileId: string;
	textFileId: string;
	noteLabel: string;

	inputDialogSmall = false;
	noClear = false;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private confirmService: ConfirmService,
		private dateRangePickerService: DateRangePickerService,
		private dateHourRangePickerService: DateHourRangePickerService,
		private localDocEditorDialogService: LocalDocEditorDialogService,
		private localTextEditorDialogService: LocalTextEditorDialogService,
		private htmlFramePrintDialogService: HtmlFramePrintDialogService,
		private emailConfirmService: EmailConfirmService,
		private optionsService: OptionsService,
		private optionListDialogService: OptionListDialogService,
		private textInputService: TextInputService,
		private timeService: TimeService,
		private textDialogService: TextDialogService,
		private passwordsInputService: PasswordsInputService,
	) {
		this.dialogSelectedControl.valueChanges.subscribe(
			v => {
				if (v === 5 || v === 6) {
					this.showSnackBarCheckbox = false;
				} else {
					this.showSnackBarCheckbox = true;
				}

			}
		);
	}

	ngOnInit() {
	}

	confirmOpen() {
		this.confirmService.open('Confirm Title', 'Do you have something to say?').subscribe(
			r => this.confirmDialogConfirmed = r
		);
	}

	confirmAreYouSure() {
		this.confirmService.openDefault().subscribe(
			r => this.confirmDialogConfirmed = r
		);
	}

	confirmAndCloseIn3Seconds() {
		this.confirmService.open('Confirm Title', 'Do you have something to say? Close in 3 seconds.').subscribe(
			r => this.confirmDialogConfirmed = r
		);

		setTimeout(() => this.confirmService.closeIfOpened(), 3000);
	}

	openDateRangePickerService() {
		this.dateRangePickerService.open(new Date(Date.now()), undefined).subscribe(
			r => {
				if (r) {
					this.startDate = r.start; this.endDate = r.end;
				}
			}
		);
	}

	openDateHourRangePickerService() {
		this.dateHourRangePickerService.open(new Date(Date.now()), undefined).subscribe(
			r => {
				if (r) {
					this.startDate = r.start; this.endDate = r.end;
				}
			}
		);
	}
	openLocalDocEditor() {
		this.localDocEditorDialogService.open({ name: 'Somewhere', description: 'Planet', useUploadUrl: this.useUploadUrl, noteLabel: 'abcde FG' }).subscribe(
			r => {
				if (r) {
					this.htmlFileId = r.fileId;
				}
			}
		);
	}

	editHtml() {
		this.localDocEditorDialogService.open({ fileId: this.htmlFileId }).subscribe(
			r => {
				//this.htmlFileId = r.fileId;
			}
		);
	}

	viewHtml() {
		const s = localStorage.getItem(this.htmlFileId);
		if (s) {
			this.htmlFramePrintDialogService.open({ title: 'My Html', htmlContent: s, size: DialogSize.Large });
		}
		else {
			this.alertService.error(`this.htmlFileId ${this.htmlFileId} not found.`);
		}
	}

	openLocalTextEditor() {
		this.localTextEditorDialogService.open({ noteLabel: 'New text' }).subscribe(
			r => {
				if (r) {
					this.textFileId = r.fileId;
				}
			}
		);
	}

	editText() {
		this.localTextEditorDialogService.open({ noteLabel: 'Some text', fileId: this.textFileId }).subscribe(
			r => {
				//this.htmlFileId = r.fileId;
			}
		);
	}

	viewText() {
		const s = localStorage.getItem(this.textFileId);
		if (s) {
			this.textDialogService.open({ title: 'My text', lines: s, size: DialogSize.Large });
		} else {
			this.alertService.error(`this.textFileId ${this.textFileId} not exist.`)
		}
	}

	confirmEmail() {
		this.emailConfirmService.open({
			to: 'someone@somewhere.com',
			cc: 'another@here.com',
			//bcc: ,
			subject: 'How do you do?',
			//body: ,
			isHtml: this.isHtml,
		}).subscribe(
			email => {
				if (email) {
					this.alertService.info(JSON.stringify(email, undefined, '\t'));
				} else {
					this.alertService.info('Email cnacelled', true);
				}
			}
		); //emailConfirmService.open
	}

	showOptions() {
		this.optionsService.open('Backend ask:', 'What option do you want?', ['One', 'Two', 'Three']).subscribe(
			r => {
				this.alertService.info(`${r} selected`, true);
			}
		);
	}

	showOptionList() {
		this.optionListDialogService.open('Someone ask:', ['One 1', 'Two 2', 'Three 3']).subscribe(
			r => {
				this.alertService.info(`${r} selected`, true);
			}
		);
	}

	showInputDialog() {
		this.textInputService.open('Input something', 'Something', 'To say', this.inputDialogSmall).subscribe(
			r => {
				this.alertService.info(r);
			}
		);
	}

	showTimeInput() {
		this.timeService.open(100, this.noClear).subscribe(
			r => {
				this.alertService.info('Minutes: ' + r);
			}
		);
	}

	showPasswordInput() {
		this.passwordsInputService.open('Defined Password').subscribe(
			r => {
				if (r) {
					this.alertService.info(r);
				} else {
					this.alertService.warn('not defined.');
				}
			}
		);
	}

}


