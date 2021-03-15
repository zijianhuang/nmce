import { Component, Inject, Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActionSheetItem } from './types';
import { Observable } from 'rxjs';
import { AppCache } from '../appCache';

/**
 * Confirmation to say Yes or No. When saying Yes, return result true, otherwise, return activeModal.dismiss().
 * This component is used by ConfirmService
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
		AppCache.removeNotificationItem(item);
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


@Injectable()
export class NotificationsService {
	constructor(private bottomSheet: MatBottomSheet) { }

	bottomSheetRef?: MatBottomSheetRef<NotificationsComponent>;

	open(data: { items: ActionSheetItem[], clearCallback: () => void}, disableClose = false): Observable<ActionSheetItem> {
		this.bottomSheetRef = this.bottomSheet.open(NotificationsComponent, {
			disableClose: disableClose,
			data: data
		});

		return this.bottomSheetRef.afterDismissed();
	}
}
