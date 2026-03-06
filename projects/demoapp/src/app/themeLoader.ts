import { AppConfigConstants } from "../environments/environment.common"; //just for typed

/**
 * Helper class to load default theme or selected theme among themes stored together with the app's deployment, rather than external links.
 * index.html should not have the theme css link during design time.
 * In addition to the main theme which could be one the prebuilt themes like one of those of Angular Material, the app may has its own app css file for colors.
 * And the dark one should be `colors-dark.css` and the light one should be `colors.css`.
 */
export class ThemeLoader {
	/**
	 * selected theme file name saved in localStorage.
	 */
	static get selectedTheme(): string | null {
		return AppConfigConstants.themeLoaderSettings ? localStorage.getItem(AppConfigConstants.themeLoaderSettings.storageKey) : null;
	};
	private static set selectedTheme(v: string) {
		if (AppConfigConstants.themeLoaderSettings) {
			localStorage.setItem(AppConfigConstants.themeLoaderSettings.storageKey, v);
		}
	};

	private static readonly appColorsDir = AppConfigConstants.themeLoaderSettings?.appColorsDir;

	/**
	 * 
	 * @param picked one of the prebuilt themes, typically used with the app's theme picker.
	 * or null for the first one in themesDic, typically used before calling `bootstrapApplication()`.
	 * @param this.appColorsDir if the app is using prebuilt theme only for all color styling, this parameter could be ignore. 
	 * Otherwise, null means that colors.css or colors-dark.css is in the root, 
	 * or a value like 'conf/' is for the directory under root,
	 * or undefined means the app uses theme only for color.
	 */
	static loadTheme(picked: string | null) {
		if (!AppConfigConstants.themesDic || !AppConfigConstants.themeLoaderSettings || Object.keys(AppConfigConstants.themesDic).length === 0) {
			console.error('AppConfigConstants need to have themesDic with at least 1 item, and themeKeys.');
			return;
		}

		const appColorsDirUndefined = this.appColorsDir === undefined;
		let themeLink = document.getElementById(AppConfigConstants.themeLoaderSettings.themeLinkId) as HTMLLinkElement;
		if (themeLink) { // app has been loaded in the browser page/tab.
			const currentTheme = themeLink.href.substring(themeLink.href.lastIndexOf('/') + 1);
			const notToLoad = picked == currentTheme;
			if (notToLoad) {
				return;
			}

			const themeValue = AppConfigConstants.themesDic[picked!];
			if (!themeValue) {
				return;
			}

			themeLink.href = picked!;
			this.selectedTheme = picked!;
			console.info(`theme altered to ${picked}.`);

			if (AppConfigConstants.themeLoaderSettings.appColorsLinkId) {
				let appColorsLink = document.getElementById(AppConfigConstants.themeLoaderSettings.appColorsLinkId) as HTMLLinkElement;
				if (appColorsLink) {
					if (themeValue.dark != null && AppConfigConstants.themeLoaderSettings.colorsDarkCss && AppConfigConstants.themeLoaderSettings.colorsCss) {
						const customFile = themeValue.dark ? AppConfigConstants.themeLoaderSettings.colorsDarkCss : AppConfigConstants.themeLoaderSettings.colorsCss;
						appColorsLink.href = this.appColorsDir ? this.appColorsDir + customFile : customFile;
					} else if (AppConfigConstants.themeLoaderSettings.colorsCss) {
						appColorsLink.href = this.appColorsDir ? this.appColorsDir + AppConfigConstants.themeLoaderSettings.colorsCss : AppConfigConstants.themeLoaderSettings.colorsCss;
					}
				}
			}
		} else { // when app is loaded for the first time, then create 
			themeLink = document.createElement('link');
			themeLink.id = AppConfigConstants.themeLoaderSettings.themeLinkId;
			themeLink.rel = 'stylesheet';
			const themeDicKey = picked ?? Object.keys(AppConfigConstants.themesDic!)[0];
			themeLink.href = themeDicKey;
			document.head.appendChild(themeLink);
			this.selectedTheme = themeDicKey;
			console.info(`Initially loaded theme ${themeDicKey}`);

			if (AppConfigConstants.themeLoaderSettings.appColorsLinkId) {
				const appColorsLink = document.createElement('link');
				appColorsLink.id = AppConfigConstants.themeLoaderSettings.appColorsLinkId;
				appColorsLink.rel = 'stylesheet';
				const themeValue = AppConfigConstants.themesDic[themeDicKey];
				if (themeValue.dark != null && AppConfigConstants.themeLoaderSettings.colorsDarkCss && AppConfigConstants.themeLoaderSettings.colorsCss) {
					const customFile = themeValue.dark ? AppConfigConstants.themeLoaderSettings.colorsDarkCss : AppConfigConstants.themeLoaderSettings.colorsCss;
					appColorsLink.href = this.appColorsDir ? this.appColorsDir + customFile : customFile;
				} else if (AppConfigConstants.themeLoaderSettings.colorsCss) {
					appColorsLink.href = this.appColorsDir ? this.appColorsDir + AppConfigConstants.themeLoaderSettings.colorsCss : AppConfigConstants.themeLoaderSettings.colorsCss;
				}

				if (appColorsLink.href) {
					document.head.appendChild(appColorsLink);
					console.info(`appColors ${appColorsLink} loaded.`)
				} else {
					console.warn(`With appColorsLinkId declared, dark&colorsCss&colorDarkCss or colorsCss should be declared`)
				}
			}
		}
	}
}
