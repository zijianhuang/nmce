import { inject, Injectable, InjectFlags, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionSheetItem } from './types';

/**
 * For derived singleton services.
 */
export class RootInjectorGuard { //thanks to https://indepth.dev/posts/1148/how-to-avoid-angular-injectable-instances-duplication
	constructor(type: Type<any>) {
		//console.debug(`Global [${type}] created.`);
		const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);

		if (parent) {
			throw Error(`[${type}]: trying to create multiple instances, but this service should be a singleton.`);
		}
	}
}

/**
 * Base type for event bus of an application event.
 * A component should inject a derived class in the constructor to receive or emit the event.
 * This class is basically a wrapper of Subject<T> of rxjs.
 * DP:
 */
 export abstract class AnySubjectService<T> {
	private subject = new Subject<T>();

	/**
	 * For subscribing the event. The component that subscribes the event should unsubscribe in ngOnDestroy.
	 */
	getMessage(): Observable<T> {
		return this.subject.asObservable();
	}

	/**
	 * For emitting event
	 * @param e Event data to emit.
	 */
	emit(e: T) {
		this.subject.next(e);
	}
}

/**
 * For singleton subject service.
 */
export abstract class GlobalSubjectService<T> extends RootInjectorGuard {
	private subject = new Subject<T>();

	constructor(type: Type<any>) {
		super(type);
	}

	/**
	 * For subscribing the event. The component that subscribes the event should unsubscribe in ngOnDestroy.
	 */
	getMessage(): Observable<T> {
		return this.subject.asObservable();
	}

	/**
	 * For emitting event
	 * @param e Event data to emit.
	 */
	emit(e: T) {
		this.subject.next(e);
	}
}

/**
 * Send and receive message across modules for NotificationsService
 * This service is to be used across modules, lazy or eager. To be provided in root module. 
 */
@Injectable({
	providedIn: 'root',
})
export class ActionSheetItemSubjectService extends GlobalSubjectService<ActionSheetItem> {
	constructor() {
		super(ActionSheetItemSubjectService);
	}
}

