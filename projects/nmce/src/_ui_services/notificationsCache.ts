import { ActionSheetItem } from './types';

export class NotificationsCache {
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
