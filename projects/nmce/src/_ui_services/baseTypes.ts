import { inject, Injectable, InjectionToken, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionSheetItem } from './types';

/**
 * For derived singleton services.
 */
export class RootInjectorGuard { //thanks to https://indepth.dev/posts/1148/how-to-avoid-angular-injectable-instances-duplication
	constructor(type: Type<any>) {
		if (!type){
			throw Error($localize`The derived concrete class had not called super(DerivedClassName) properly.`);
		}

		console.debug(`Global [${type.name}] created.`); // name is correct only when build or serve with  --optimization=false
		const parent = inject(type, { optional: true, skipSelf: true });
		if (parent) {
			throw Error($localize`[${type.name}]: trying to create multiple instances, but this service should be a singleton.`);
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
	private subjectObservable: Observable<T>;

	constructor(){
		this.subjectObservable= this.subject.asObservable();
	}

	/**
	 * For subscribing the event. The component that subscribes the event should unsubscribe in ngOnDestroy.
	 */
	getMessage(): Observable<T> {
		return this.subjectObservable;
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
	private subjectObservable: Observable<T>;

	constructor(type: Type<any>) {
		super(type);
		this.subjectObservable= this.subject.asObservable();
	}

	/**
	 * For subscribing the event. The component that subscribes the event should unsubscribe in ngOnDestroy.
	 */
	getMessage(): Observable<T> {
		return this.subjectObservable;
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

export const DIALOG_ACTIONS_ALIGN = new InjectionToken<'start' | 'center' | 'end'>('Material Dialog action buttons align');

