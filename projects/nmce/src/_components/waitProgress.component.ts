import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { WaitMessage, WaitProgressService } from '../_ui_services/index';
import { MatProgressBarModule } from '@angular/material/progress-bar';


/**
 * Display wait with mat-progress-bar, controllable by mode and value.
 */
@Component({
    selector: 'waitProgress, nmce-wait-progress, nmceWaitProgress',
    exportAs: 'nmceWaitProgress',
    templateUrl: 'waitProgress.component.html',
    standalone: true,
	imports: [
    MatProgressBarModule
]
})
export class WaitProgressComponent implements OnInit, OnDestroy {
	message: WaitMessage;
	private bs: Subscription;

	constructor(private waitService: WaitProgressService) { }

	loading = false;

	@Input()
	value: number | undefined = 0;

	@Input()
	bufferValue = 100;

	mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

	ngOnInit() {
		this.bs = this.waitService.getMessage().subscribe(message => {
			this.message = message;
			if (message) {
				this.loading = this.message.loading;
				this.value = this.message.value;

				if (this.message.mode && this.message.mode !== this.mode) {
					this.mode = this.message.mode;
				} else if (this.value && this.mode !== 'determinate') {
					this.mode = 'determinate';
				}
			}
		});
	}

	ngOnDestroy() {
		this.bs.unsubscribe();
	}

}
