import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { bounceInDown, flash } from 'ng-animate';
import { AlertService, NotificationsCache, NotificationsService } from 'nmce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
		trigger('newNotificationComing', [
			state('zero', style({})),

			state('more', style({})),

			state('one', style({})),

			transition('zero => *', useAnimation(bounceInDown, { delay: 500 })),

			transition('* => *', useAnimation(flash, { delay: 200 })),
		])

	]
})
export class AppComponent {
  title = 'demoapp';

  notificationsState = 'zero';

  get notificationsCount() {
    if (NotificationsCache.notificationsQueue.length === 0) { //this count is associated to ngIf in html, so called frequently by NG runtime.
      this.notificationsState = 'zero';
    }

    return NotificationsCache.notificationsQueue.length;
  }

  constructor(private alertService: AlertService,
    private notificationsService: NotificationsService,
  ) {
    this.alertService.initOnce();
  }

  /**
   * This is also hooked to <button *ngIf="notificationsCount>0" [@newNotificationComing]="notificationsState" type="button" mat-button mat-raised-button (click)="showNotifications()"
   */
  showNotifications() {
    this.notificationsService.open({ items: NotificationsCache.notificationsQueue, clearCallback: this.clearNotifications }).subscribe(actionItem => {
      if (actionItem) {
        switch (actionItem.actionType) {
          case 'task':
            this.alertService.info('task ok');
            break;
          default:
            break;
        }

        NotificationsCache.removeNotificationItem(actionItem);
      }
    });

  }

	private clearNotifications() {
		NotificationsCache.clearNotificationQueue();
	}

}
