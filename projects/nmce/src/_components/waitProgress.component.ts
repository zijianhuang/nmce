import { Component, computed, inject, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WaitMessage, WaitProgressService } from '../_ui_services/wait.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class WaitProgressComponent {
    private waitService = inject(WaitProgressService);

    /** Latest message from the wait service, auto-subscribed/unsubscribed. */
    readonly message = toSignal<WaitMessage | undefined>(this.waitService.getMessage());

    /** Input value used only until/unless the service provides its own value. */
    readonly valueInput = input<number | undefined>(0, { alias: 'value' });
    readonly bufferValue = input(100);

    readonly loading = computed(() => this.message()?.loading ?? false);

    readonly value = computed<number | undefined>(() => {
        const msg = this.message();
        return msg?.value ?? this.valueInput();
    });

    readonly mode = computed<'determinate' | 'indeterminate' | 'buffer' | 'query'>(() => {
        const msg = this.message();
        if (msg?.mode) {
            return msg.mode;
        }
        return this.value() ? 'determinate' : 'determinate';
    });
}
// export class WaitProgressComponent implements OnInit, OnDestroy {
// 	message: WaitMessage;
// 	private bs: Subscription;
// 	loading = false;

// 	constructor(private waitService: WaitProgressService, private cdr: ChangeDetectorRef) { }

// 	@Input()
// 	value: number | undefined = 0;

// 	@Input()
// 	bufferValue = 100;

// 	mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

// 	ngOnInit() {
// 		this.bs = this.waitService.getMessage().subscribe(message => {
// 			this.message = message;
// 			if (message) {
// 				this.loading = this.message.loading;
// 				this.value = this.message.value;

// 				if (this.message.mode && this.message.mode !== this.mode) {
// 					this.mode = this.message.mode;
// 				} else if (this.value && this.mode !== 'determinate') {
// 					this.mode = 'determinate';
// 				}
// 			}
// 			this.cdr.markForCheck();
// 		});
// 	}

// 	ngOnDestroy() {
// 		this.bs.unsubscribe();
// 	}

// }
