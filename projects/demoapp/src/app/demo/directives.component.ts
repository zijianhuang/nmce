import { Component, OnInit } from '@angular/core';
import { DemoInputDialogService } from './demoInput.dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

/**
 * Fill up the user registration form and register. Then roles checkboxes will appear.
 * and the Register button may become disabled when the user is just registered.
 */
@Component({
    templateUrl: 'directives.component.html',
    standalone: true,
	imports: [MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class DirectivesComponent implements OnInit {
	currentDateTime: Date;
	constructor(
		private demoInputDialogService: DemoInputDialogService,
	) {
		this.currentDateTime = new Date();
	}

	ngOnInit() {
	}

	showDemoInputDialog() {
		this.demoInputDialogService.open();
	}

}


