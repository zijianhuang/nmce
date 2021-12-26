import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AlertSubjectMessage, LocalAlertService } from '../_ui_services/index';

/**
 * Alert to render element alert in a component through LocalAlertService.
 * And alert message is also written into console with respective alert type.
 */
@Component({
	selector: 'alert',
	templateUrl: 'alert.component.html',
	styleUrls: ['../styles.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
	private alive = true;
	message: AlertSubjectMessage={};

	get hasContent(): boolean {
		if (this.message && this.message.text) {
			return true;
		} else {
			return false;
		}

	}

	constructor(
		private alertService: LocalAlertService,
		private ref: ChangeDetectorRef
		) {

	}

	ngOnInit() {
		this.alertService.getMessage().pipe(takeWhile(() => this.alive)).subscribe(msg => {
			this.message = msg;

			if (msg) {
				if (msg.type === 'success') {
					console.info(msg.text);
				} else if (msg.type === 'error') {
					console.error(msg.text);
				} else if (msg.type === 'info') {
					console.info(msg.text);
				} else if (msg.type === 'warning') {
					console.warn(msg.text);
				} else {
					console.warn(msg.text);
				}
			}

			this.ref.detectChanges(); //to make sure the component render mid and tic. Otherwise, in Chrome an FF, I have to click. Not sure if this is a bug in NG2.
		});
	}

	ngOnDestroy(): void {
		this.alive = false;
	}


}
