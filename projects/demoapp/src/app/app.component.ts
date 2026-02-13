import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, DOCUMENT, Inject, OnDestroy, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { bounceInDown, flash } from 'ng-animate';
import { ActionSheetItemSubjectService, AlertService, NotificationsService } from 'nmce';
import { Subject } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import packageJson from '../../../../package.json';
import { AppConfigConstants, ThemeDef } from '../environments/environment.common';
import { APP_DI_CONFIG } from './app-config';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { ThemeLoader } from './themeLoader';


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
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, RouterModule, MatFormField, MatSelect, MatLabel, MatOption]
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'demoapp';

  notificationsState = 'zero';
  private unsubscribe: Subject<void> = new Subject();

  get notificationsCount() {
    if (this.notificationsService.items.length === 0) { //this count is associated to ngIf in html, so called frequently by NG runtime.
      this.notificationsState = 'zero';
    }

    return this.notificationsService.items.length;
  }

  themes?: ThemeDef[];

  get selectedTheme(): string | null {
    return APP_DI_CONFIG.selectedTheme;
  }
  set selectedTheme(v: string) {
    APP_DI_CONFIG.selectedTheme = v;
  }

  @ViewChild('themeSelect') themeSelect: MatSelect;

  get currentTheme(){
    return ThemeLoader.selectedTheme;
  }

  constructor(private alertService: AlertService,
    private notificationsService: NotificationsService,
    private actionSheetItemSubjectService: ActionSheetItemSubjectService,
    iconRegistry: MatIconRegistry,

  ) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    this.themes = AppConfigConstants.themesDic ? Object.keys(AppConfigConstants.themesDic).map(k => {
      const c = AppConfigConstants.themesDic![k];
      const obj: ThemeDef = {
        name: c.name,
        fileName: k,
        dark: c.dark
      };
      return obj;
    }) : undefined;

    this.alertService.initOnce();
    this.actionSheetItemSubjectService.getMessage().subscribe(
      d => this.showNotifications()
    );
  }

  ngOnInit(): void {
    
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

  showAbout() {
    const materialVersion = packageJson.dependencies['@angular/material'].replace('^', '');
    this.alertService.info(`Angular: ${VERSION.full}; Angular Material: ${materialVersion}`, false);
  }

  themeSelectionChang(e: MatSelectChange) {
    ThemeLoader.loadTheme(e.value, 'conf/');
  }
}

