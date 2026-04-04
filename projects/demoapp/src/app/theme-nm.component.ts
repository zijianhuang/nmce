import {
	ChangeDetectionStrategy,
	Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeDef, ThemeConfigConstants } from './themeDef';
import { ThemeLoader } from './themeLoader';
import { RouterModule } from '@angular/router';

/**
 * Simulate the theme menu of https://material.angular.dev/, just without the theme specific inline SVG icons.
 * The html template is based on "theme-picker.html" of Angular Material docs, but adapted to use ThemeLoader.
 */
@Component({
	selector: 'theme-nm-menu',
	templateUrl: 'theme-nm.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, MatButtonModule, RouterModule,
		MatTooltipModule, MatMenuModule
	]
})
export class ThemeNmMenu {
	themes?: ThemeDef[];

	get currentTheme() {
		return ThemeLoader.selectedTheme;
	}

	constructor() {
		this.themes = ThemeConfigConstants.themesDic ? Object.keys(ThemeConfigConstants.themesDic).map(k => {
			const c = ThemeConfigConstants.themesDic![k];
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