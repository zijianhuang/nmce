import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WaitMessage, WaitService } from '../_ui_services/wait.service';

/**
 * Display wait with mat-progress-bar. Working with WaitService.
 */
@Component({
    selector: 'wait, nmce-wait, nmceWait',
    templateUrl: 'wait.component.html',
    standalone: true,
	imports: [
		MatProgressBarModule
	]
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
