import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit, VERSION, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { bounceInDown, flash } from 'ng-animate';
import { ActionSheetItemSubjectService, AlertService, NotificationsService } from 'nmce';
import { Subject } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import packageJson from '../../../../package.json';

import { ThemeLoader } from './themeLoader';
import { ThemeDef, ThemeConfigConstants } from './themeDef';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeNmMenu } from "./theme-nm.component";
import { ThemeMenu } from './theme-menu.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [MatIconModule, MatButtonModule, MatBadgeModule, RouterModule,
		MatTooltipModule, MatMenuModule, ThemeMenu, ThemeNmMenu]
})
export class AppComponent implements OnDestroy, OnInit {
	title = 'demoapp';

	flashActive = signal(false);

	notificationsCount = signal(0);

	private triggerFlash() {
		this.flashActive.set(false); // reset in case it's mid-animation
		queueMicrotask(() => {
			this.flashActive.set(true);
			setTimeout(() => this.flashActive.set(false), 800); // match keyframe duration
		});
	}

	themes?: ThemeDef[];

	get currentTheme() {
		return ThemeLoader.selectedTheme;
	}

	constructor(private alertService: AlertService,
		private notificationsService: NotificationsService,
		private actionSheetItemSubjectService: ActionSheetItemSubjectService,
		iconRegistry: MatIconRegistry,

	) {
		iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
		this.themes = ThemeConfigConstants.themesDic ? Object.keys(ThemeConfigConstants.themesDic).map(k => {
			const c = ThemeConfigConstants.themesDic![k];
			const obj: ThemeDef = {
				display: c.display,
				filePath: k,
				dark: c.dark
			};
			return obj;
		}) : undefined;

		this.alertService.initOnce();
		this.actionSheetItemSubjectService.getMessage().subscribe(
			d => {
				this.syncNotificationsCount();
				this.triggerFlash();
				this.showNotifications();
			}
		);
	}

	ngOnInit(): void {

	}

	private syncNotificationsCount() {
		this.notificationsCount.set(this.notificationsService.items.length);
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
				this.syncNotificationsCount(); // count changed → update the signal here, not in a getter
			}
		});

	}

	ngOnDestroy() {
	}

	showAbout() {
		const materialVersion = packageJson.dependencies['@angular/material'].replace('^', '');
		this.alertService.info(`Angular: ${VERSION.full}; Angular Material: ${materialVersion}`, false);
	}

}

