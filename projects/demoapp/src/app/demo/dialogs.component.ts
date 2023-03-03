import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	AlertService, DataComponentPrintDialogService, LazyComponentDialogService, TextDialogService, TextHReflDialogService
} from 'nmce';
import { JsonDiffDialogService } from 'nmce-json-diff';
import { HtmlDialogsComponent } from './htmlDialogs.component';

/**
 * Fill up the user registration form and register. Then roles checkboxes will appear.
 * and the Register button may become disabled when the user is just registered.
 */
@Component({
	templateUrl: 'dialogs.component.html',
})
export class DialogsComponent implements OnInit {
	loading = false;
	userId: string;
	submitted: boolean;

	dialogSelectedControl: FormControl = new FormControl(1);
	dialogSelectedControlForHtml: FormControl = new FormControl(1);
	dialogSelectedControlForJson: FormControl = new FormControl(1);
	dialogSelectedControlForError: FormControl = new FormControl(1);
	snackBar: boolean | undefined = undefined;
	showSnackBarCheckbox = true;

	useBackButton: boolean;
	useLargeHtml = false;
	useLargeImg = false;
	sizeSelectedControl: FormControl = new FormControl(1);

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private textDialogService: TextDialogService,
		private textHReflDialogService: TextHReflDialogService,
		private jsonDiffDialogService: JsonDiffDialogService,
		private dataComponentPrintDialogService: DataComponentPrintDialogService,
		private lazyComponentDialogService: LazyComponentDialogService,
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

	showDialog() {
		switch (this.dialogSelectedControl.value) {
			case 1: this.alertService.success('Success', this.snackBar, 'Subtitle here');
				break;
			case 2: this.alertService.info('Info', this.snackBar, 'Subtitle here');
				break;
			case 3: this.alertService.warn('Warn', this.snackBar, 'Subtitle here');
				break;
			case 4: this.alertService.error('Error', this.snackBar, 'Subtitle here');
				break;
			case 5: this.alertService.warnMessage('Warn message', 'Subtitle here');
				break;
			case 6: this.alertService.errorMessage('Error message', 'Subtitle here');
				break;
			case 7: this.alertService.success('Success Success Success Success Success Success Success ', this.snackBar);
				break;
			default:
				this.alertService.warn('Hey, fix this.');
				break;
		}
	}

	showDialogWithHtml() {
		switch (this.dialogSelectedControlForHtml.value) {
			case 1: this.alertService.success('Success <strong>OK</strong>', this.snackBar, 'Subtitle here', 'html');
				break;
			case 2: this.alertService.info('Info <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>', this.snackBar, 'Subtitle here', 'html');
				break;
			case 3: this.alertService.warnMessage('Warn message <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>', 'Subtitle here', 'html');
				break;
			case 4: this.alertService.errorMessage('Error message <strong>OK <a target="_blank" href="https://material.angular.io/components/categories">Please check this.</a></strong>', 'Subtitle here', 'html');
				break;
			default:
				this.alertService.warn('Hey, fix this.');
				break;
		}
	}

	showDialogWithJson() {
		const j = JSON.stringify({ this: 'this value', that: 'That value', nested: { here: 'Somewhere', there: 'Out there' } }, null, '\t');
		switch (this.dialogSelectedControlForJson.value) {
			case 1: this.alertService.success(j, this.snackBar, 'Subtitle here', 'json');
				break;
			case 2: this.alertService.info(j, this.snackBar, 'Subtitle here', 'json');
				break;
			case 3: this.alertService.warnMessage(j, 'Subtitle here', 'json');
				break;
			case 4: this.alertService.errorMessage(j, 'Subtitle here', 'json');
				break;
			default:
				this.alertService.warn('Hey, fix this.');
				break;
		}
	}

	showDialogWithError() {
		switch (this.dialogSelectedControlForError.value) {
			case 1: //html
				this.http.get('https://jsonapi.org/somewhere').subscribe(
					{
						next: d => { },
						error: error => this.alertService.error(error)
					}
				);

				break;
			case 2: //text
				this.http.get('http://localhost:5000/api/values/666').subscribe(
					d => { },
					error => this.alertService.error(error),
				);

				break;
			case 3:
				this.http.get('https://graph.facebook.com/facebook/picture?redirect=ccc').subscribe(
					d => { },
					error => this.alertService.error(error),
				);

				break;
			case 4:
				break;
			default:
				this.alertService.warn('Hey, fix this.');
				break;
		}

	}

	showTextDialog() {
		this.textDialogService.open({
			title: 'Some lines',
			lines: `sdfsdfsd
AAAAAAAAAAAAAAAAAA  bbbbbbbbbbbbbbbbbbbbbbbbbb
CCCCCCCCCCCCCCCCCCCCCC

DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD dddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddd
1111111111111111111
222222222222222222222
33333333333333333333333333333333333
44444444444444444444444444444
`,
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		}).subscribe();
	}

	showTextHRefDialog() {
		this.textHReflDialogService.open({
			title: 'Some lines',
			url: 'https://heroes.fonlow.net/webapi/api/heroes',
			size: this.sizeSelectedControl.value,
			useBackButton: this.useBackButton
		}).subscribe();
	}

	showJsonDialog() {
		this.alertService.warn('Not supported anymore.');
	}

	showJsonDiffDialog() {
		this.jsonDiffDialogService.open('JSON Diff', {
			json1: {
				surname: 'Smith',
				givenName: 'John',
				spouse: {
					surname: 'Smith',
					givenName: 'Alice'
				}
			},
			json2: {
				surname: 'Smith',
				givenName: 'John',
				spouse: {
					surname: 'Smith',
					givenName: 'Kay',
					midName: 'C'
				}
			}
		}).subscribe();
	}

	showAnyComponent() {
		this.lazyComponentDialogService.open('Any NG component', HtmlDialogsComponent, 'ABCDEFG',
			{ autofocus: true, fullScreen: this.sizeSelectedControl.value == 1 }).subscribe();
	}

	printAnyComponent() {
		this.dataComponentPrintDialogService.open('Print NG component', HtmlDialogsComponent, '1234567',
			{ autofocus: true, fullScreen: this.sizeSelectedControl.value == 1 }).subscribe();
	}
}
