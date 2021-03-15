import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Waiting for progress, showing spinner
 */
export abstract class WaitServiceBase {
	private subject = new Subject<WaitMessage>();
	private keepAfterNavigationChange = false;

	/**
	 * Client code may use this to disable the button that triggered the action
	 */
	loading = false;

	constructor(router: Router) {
		// clear alert message on route change
		router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (this.keepAfterNavigationChange) {
					// only keep for a single location change
					this.keepAfterNavigationChange = false;
				} else {
					// clear alert
					this.subject.next();
				}
			}
		});
	}

	setWait(w: WaitMessage) {
		this.loading = w.loading;
		this.subject.next(w);
	}

	getMessage(): Observable<WaitMessage> {
		return this.subject.asObservable();
	}


}

@Injectable()
export class WaitService extends WaitServiceBase {
	constructor(router: Router) { super(router); }
}

export class LocalWaitService { //intentionally not injectable
	loading = false;
	constructor(private waitService: WaitService) {

	}

	StartWait() {
		this.waitService.setWait({ loading: true });
		this.loading = true;
	}

	EndWait() {
		this.waitService.setWait({ loading: false });
		this.loading = false;
	}
}

@Injectable()
export class WaitProgressService extends WaitServiceBase {
	constructor(router: Router) { super(router); }
}


export interface WaitMessage {
	text?: string;
	value?: number;
	loading: boolean;
	mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

