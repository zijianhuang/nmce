import { Component, Inject, Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionSheetItemSubjectService, RootInjectorGuard } from './baseTypes';
import { ActionSheetItem } from './types';

class NotificationsCache { //not exported intentionally
	private static notifications: ActionSheetItem[] = [];

	/**
	 * All items as array in the queue
	 */
	static get notificationsQueue(): ActionSheetItem[] {
		return this.notifications;
	}

	static pushNotificationQueue(n: ActionSheetItem) {
		this.notifications.push(n);
		if (this.notifications.length > 20) {
			this.notifications.shift();
		}
	}

	static clearNotificationQueue() {
		this.notifications = [];
	}

	static removeNotificationItem(n: ActionSheetItem) {
		const idx = this.notifications.indexOf(n);
		this.notifications.splice(idx, 1);
	}

}

/**
 * Display ActionSheet to simulate the notification feature of Windows and other OSs.
 */
@Component({
	templateUrl: 'notifications.component.html',
	styleUrls: ['../nmcestyles.css']
})
export class NotificationsComponent {

	get items(): ActionSheetItem[] {
		return NotificationsCache.notificationsQueue;
	}

	title='For actionable items, please save current works before action';

	constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: {title: string}, public sheetRef: MatBottomSheetRef<NotificationsComponent>
	) {
		this.title=data.title;
	}

	handleAction(item: ActionSheetItem) {
		this.sheetRef.dismiss(item);
	}

	getDigest(s: string) {
		return this.getOneLineDigest(s, 152);
	}

	private getOneLineDigest(s: string, length: number) {
		if (!s) {
			return '';
		}

		const ss = s.substring(0, length);
		if (s.length > length) {
			return ss + '...';
		} else {
			return ss;
		}
	}

	remove(item: ActionSheetItem) {
		NotificationsCache.removeNotificationItem(item);
	}

	clearAndClose() {
		NotificationsCache.clearNotificationQueue();
		this.sheetRef.dismiss();
	}
}

/**
 * Upon receiving notification messages, display ActionSheet.
 * Intended to be used in push from the backend, while local background tasks may surely send notification too.
 * When being used with SignalR, be aware that SignalR is not working with IIS Express, but IIS.
 * This service is to be used across modules, lazy or eager. To be provided in root module. To be used in app.component.
 */
@Injectable({
	providedIn: 'root',
})
export class NotificationsService extends RootInjectorGuard {
	constructor(private bottomSheet: MatBottomSheet,
		private actionSheetItemSubjectService: ActionSheetItemSubjectService) {
		super(NotificationsService);
		this.actionSheetItemSubjectService.getMessage().subscribe(
			item => {
				console.debug('item pushed.');
				NotificationsCache.pushNotificationQueue(item);
			}
		)
	}

	private bottomSheetRef: MatBottomSheetRef<NotificationsComponent>;

	/**
	 * 
	 * @param disableClose 
	 * @returns clicked item
	 */
	open(title: string, disableClose = false): Observable<ActionSheetItem> {
		this.bottomSheetRef = this.bottomSheet.open(NotificationsComponent, {
			disableClose: disableClose,
			data: {title: title},
		});

		return this.bottomSheetRef.afterDismissed();
	}

	get items(): ActionSheetItem[] {
		return NotificationsCache.notificationsQueue;
	}

	remove(item: ActionSheetItem) {
		NotificationsCache.removeNotificationItem(item);
	}


}
