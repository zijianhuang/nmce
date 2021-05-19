import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionSheetItem } from './types';
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
		console.debug('222222222222222');
		return this.subject.asObservable();
	}

	/**
	 * For emitting event
	 * @param e Event data to emit.
	 */
	emit(e: T) {
		console.debug('111111111111111111111: ' + JSON.stringify(e));
		this.subject.next(e);
	}

}


@Injectable({
	providedIn: 'root',
})
export class ActionSheetItemSubjectService extends AnySubjectService<ActionSheetItem> {
	constructor() {
		super();
		console.debug('ActionSheetItemSubjectService created.');
	}
}

