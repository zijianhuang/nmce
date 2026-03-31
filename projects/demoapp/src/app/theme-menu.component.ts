import {
	ChangeDetectionStrategy,
	Component,
	Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeDef } from '../environments/themeDef';
import { ThemeLoader } from './themeLoader';
import { AppConfigConstants } from '../environments/environment.common';
import { RouterModule } from '@angular/router';

/**
 * Select a theme from menu.
 */
@Component({
	selector: 'theme-menu',
	templateUrl: 'theme-menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, MatButtonModule, RouterModule,
		MatTooltipModule, MatMenuModule
	]
})
export class ThemeMenu {
	themes?: ThemeDef[];

	get currentTheme() {
		return ThemeLoader.selectedTheme;
	}

	@Input()
	menuTriggerElement: 'Button' | 'Menu' = 'Button';

	constructor() {
		this.themes = AppConfigConstants.themesDic ? Object.keys(AppConfigConstants.themesDic).map(k => {
			const c = AppConfigConstants.themesDic![k];
			const obj: ThemeDef = {
				display: c.display,
				filePath: k,
				dark: c.dark
			};
			return obj;
		}) : undefined;
	}

	selectTheme(themeUrl: string) {
		ThemeLoader.loadTheme(themeUrl);
	}
}