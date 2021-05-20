import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionSheetItemSubjectService, LocalAlertService, WaitService } from 'nmce';


/**
 * Fill up the user registration form and register. Then roles checkboxes will appear.
 * and the Register button may become disabled when the user is just registered.
 */
@Component({
	templateUrl: 'components.component.html',
})
export class ComponentsComponent implements OnInit {
	loading = false;
	userId: string;
	submitted: boolean;

	inputDialogSmall = false;
	noClear = false;

	dialogSelectedControl: FormControl = new FormControl(1);

	get waitServiceIsWaiting() {
		return this.waitService.loading;
	}

	yearMonthExpiryControl: FormControl= new FormControl(undefined);

	yearMonthControl: FormControl;

	constructor(
		private localAlertService: LocalAlertService,
		private waitService: WaitService,
		//private localWaitService: LocalWaitService,
		private actionSheetItemSubjectService: ActionSheetItemSubjectService
	) {

	}

	ngOnInit() {
	}


	localAlert() {
		this.localAlertService.info('Some part of the app is telling something.');
		switch (this.dialogSelectedControl.value) {
			case 1: this.localAlertService.success('Some part of the app is telling success.');
				break;
			case 2: this.localAlertService.info('Some part of the app is telling info.');
				break;
			case 3: this.localAlertService.warn('Some part of the app is telling warning.');
				break;
			case 4: this.localAlertService.error('Some part of the app is telling error.');
				break;
			default:
				this.localAlertService.warn('Hey, fix this.');
				break;
		}
	}

	toggleWait() {
		this.waitService.setWait({ loading: !this.waitService.loading });
	}

	endWait() {

	}

	addNotification() {
		const id = Date.now().toString();
		this.actionSheetItemSubjectService.emit({
			actionType: 'test',
			actionId: id,
			actionLabel: 'Hey do something ' + id,
			message: 'Find out more details' + id,
		});
	}
}


