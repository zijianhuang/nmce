import { Component, Inject, Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { NotificationsCache } from './notificationsCache';
import { ActionSheetItem } from './types';

/**
 * Display ActionSheet to simulate the notification feature of Windows and other OSs.
 */
@Component({
	templateUrl: 'notifications.component.html',
})
export class NotificationsComponent {
	items: ActionSheetItem[] = [];

	constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { items: ActionSheetItem[], clearCallback: () => void }, public sheetRef: MatBottomSheetRef<NotificationsComponent>) {
		this.items = data.items;
	}

	handleAction(item: ActionSheetItem) {
		this.sheetRef.dismiss(item);
	}

	remove(item: ActionSheetItem) {
		NotificationsCache.removeNotificationItem(item);
	}

	clear() {
		this.data.clearCallback();
		this.sheetRef.dismiss();
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
}

/**
 * To be injected in app.component. Upon receiving notification messages, display ActionSheet.
 * Intended to be used in push from the backend, while local background tasks may surely send notification too.
 * When being used with SignalR, be aware that SignalR is not working with IIS Express, but IIS.
 */
@Injectable()
export class NotificationsService {
	constructor(private bottomSheet: MatBottomSheet) { }

	bottomSheetRef: MatBottomSheetRef<NotificationsComponent>;

	open(data: { items: ActionSheetItem[], clearCallback: () => void}, disableClose = false): Observable<ActionSheetItem> {
		this.bottomSheetRef = this.bottomSheet.open(NotificationsComponent, {
			disableClose: disableClose,
			data: data
		});

		return this.bottomSheetRef.afterDismissed();
	}
}
