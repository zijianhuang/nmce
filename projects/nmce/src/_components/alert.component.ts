import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalAlertService } from '../_ui_services/localAlert.service';
import { AlertSubjectMessage } from '../_ui_services/types';

/**
 * Alert to render element alert in a component through LocalAlertService.
 * And alert message is also written into console with respective alert type.
 */
@Component({
    selector: 'alert, nmce-alert, nmceAlert',
    exportAs: 'nmceAlert',
    templateUrl: 'alert.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	]
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

			this.ref.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.alive = false;
	}
}
