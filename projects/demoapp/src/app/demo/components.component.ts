import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	LocalAlertService,
} from 'nmce';
import { LocalDocEditorDialogService, EmailConfirmService } from 'nmce-html-editor';



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

	constructor(
		private localAlertService: LocalAlertService
	) {

	}

	ngOnInit() {
	}


	localAlert(){
		this.localAlertService.info('Some part of the app is telling something.');
	}
}


