import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WaitMessage, WaitService } from '../_ui_services/wait.service';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class WaitComponent {
	private waitService = inject(WaitService);
	message = toSignal(this.waitService.getMessage(), {
		initialValue: { loading: false } as WaitMessage,
	});
	loading = computed(() => this.message().loading);
}

// export class WaitComponent implements OnInit, OnDestroy {
// 	message: WaitMessage;
// 	private bs: Subscription;
// 	loading = false;

// 	constructor(private waitService: WaitService,
// 		private cdr: ChangeDetectorRef,
// 	) { }

// 	ngOnInit() {
// 		console.debug('WaitComponent init.');
// 		this.bs = this.waitService.getMessage().subscribe(message => {
// 			this.message = message;
// 			if (message) {
// 				this.loading = this.message.loading;
// 				console.debug('WaitComponent: ' + this.loading + ' ' + message.text);
// 			}

// 			this.cdr.markForCheck();
// 		});
// 	}

// 	ngOnDestroy(): void {
// 		console.debug('WaitComponent ngOnDestroy');
// 		this.bs.unsubscribe();
// 	}
// }

