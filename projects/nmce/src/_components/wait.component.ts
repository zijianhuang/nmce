import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WaitMessage, WaitService } from '../_ui_services/index';

/**
 * Display wait with mat-progress-bar. Working with WaitService.
 */
@Component({

	selector: 'wait, nmce-wait, nmceWait',
	templateUrl: 'wait.component.html'
})
export class WaitComponent implements OnInit, OnDestroy {
	message: WaitMessage;
	private bs: Subscription;

	constructor(private waitService: WaitService) { }

	loading = false;

	ngOnInit() {
		console.debug('WaitComponent init.');
		this.bs = this.waitService.getMessage().subscribe(message => {
			this.message = message;
			if (message) {
				this.loading = this.message.loading;
				console.debug('WaitComponent: ' + this.loading + ' ' + message.text);
			}
		});
	}

	ngOnDestroy(): void {
		console.debug('WaitComponent ngOnDestroy');
		this.bs.unsubscribe();
	}

}
