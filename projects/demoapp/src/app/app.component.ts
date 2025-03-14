import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { bounceInDown, flash } from 'ng-animate';
import { ActionSheetItemSubjectService, AlertService, NotificationsService } from 'nmce';
import { Subject } from 'rxjs';

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
    ],
    standalone: false
})
export class AppComponent implements OnDestroy {
  title = 'demoapp';

  notificationsState = 'zero';
  private unsubscribe: Subject<void> = new Subject();

  get notificationsCount() {
    if (this.notificationsService.items.length === 0) { //this count is associated to ngIf in html, so called frequently by NG runtime.
      this.notificationsState = 'zero';
    }

    return this.notificationsService.items.length;
  }

  constructor(private alertService: AlertService,
    private notificationsService: NotificationsService,
    private actionSheetItemSubjectService: ActionSheetItemSubjectService,
  ) {
    this.alertService.initOnce();
    this.actionSheetItemSubjectService.getMessage().subscribe(
      d => this.showNotifications()
    );
  }

  /**
   * Only app.component should call notificationsService.open(). All other parts of the SPA should use event handling to call showNotifications().
   * This is also hooked to <button *ngIf="notificationsCount>0" [@newNotificationComing]="notificationsState" type="button" mat-raised-button (click)="showNotifications()"
   */
  showNotifications() {
    this.notificationsService.open('Notifications').subscribe(actionItem => {
      if (actionItem) {
        switch (actionItem.actionType) {
          case 'test':
            if (actionItem.actionLabel) {
              this.alertService.notify(actionItem.message!, actionItem.actionLabel);
            } else {
              this.alertService.notify(actionItem.message!);
            }
            break;
          default:
            break;
        }

        this.notificationsService.remove(actionItem);
      }
    });

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
