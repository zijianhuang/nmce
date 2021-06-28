import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

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

/**
 * Used togehter with <wait> element, generally for handling observable. Start wait before calling an observable, stop wait in subscribe.
 * The mechanism is sending and receiving WaitMessage.
 */
@Injectable({
	providedIn: 'root',
})
export class WaitService extends WaitServiceBase {
	constructor(router: Router) {
		super(router);
		console.debug('WaitService created.');
	}
}

/**
 * This service is intentionally not injectable, and should be created inside the constructor of a component.
 */
export class LocalWaitService {
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

@Injectable({
	providedIn: 'root',
})
export class WaitProgressService extends WaitServiceBase {
	constructor(router: Router) {
		super(router); console.debug('WaitProgressService created.');
	}
}


export interface WaitMessage {
	text?: string;
	value?: number;
	loading: boolean;
	mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

