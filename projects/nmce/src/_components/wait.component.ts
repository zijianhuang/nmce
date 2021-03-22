import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WaitMessage, WaitService } from '../_ui_services/index';

/**
 * display wait with mat-progress-bar.
 */
@Component({

	selector: 'wait',
	templateUrl: 'wait.component.html'
})
export class WaitComponent implements OnInit, OnDestroy {
	message: WaitMessage;
	private bs: Subscription;

	constructor(private waitService: WaitService) { }

	loading = false;

	ngOnInit() {
		this.bs = this.waitService.getMessage().subscribe(message => {
			this.message = message;
			if (message) {
				this.loading = this.message.loading;
			}
		});
	}

	ngOnDestroy(): void {
		this.bs.unsubscribe();
	}

}
