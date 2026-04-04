export interface ThemeValue {
	/** Display name used in the UI like menu or dropdown */
	display: string;

	/** Dark them or not. Optionally to tell which optional app level colors CSS to use, if some app level colors need to adapt the light or dark theme. */
	dark?: boolean;
}

export interface ThemeDef extends ThemeValue {
	/** Relative path or URL to CDN */
	filePath: string;
}

export interface ThemesDic {
	[filePath: string]: ThemeValue
}

export interface ThemeLoaderSettings {
	/**
	 * The key of themeDic to store the selected theme in local storage of browser. Each app or site must have a unique key to avoid conflict with other apps or sites.
	 */
	storageKey: string;

	/**
	 * The id of the link element in index.html for loading the theme CSS file dynamically during app startup and operation.
	 */
	themeLinkId: string;

	/** 
	 * Optionally the app may has an app level colors CSS declaring colors neutral to the light or dark theme, in addition to a prebuilt theme reused across apps. 
	 * If some colors need to adapt the light or dark theme, having those colors defined in colorsCss and colorsDarkCss is convenient for SDLC, since you can
	 * use tools to flip colors to dark or light.
	 */
	appColorsLinkId?: string;

	/**
	 * If undefined or null, app colors css is in root.
	 * Effected only when appColorsLinkId is defined.
	 */
	appColorsDir?: string;

	/** 
	 * Optionally the app may has an app level colors CSS declaring colors adapting to the light theme. 
	 * If the app uses only light or dark theme, for example ThemeValue.dark is not defined, this alone is enough, not needing colorsDarkCss. 
	*/
	colorsCss?: string;

	/** 
	 * Optionally the app may has an app level colors CSS declaring colors adapting to the dark theme. 
	 * If the app uses only light or dark theme, there's no need to declare this. 
	 */
	colorsDarkCss?: string;
}

interface Theme_Config {
	themesDic?: ThemesDic,

	themeLoaderSettings?: ThemeLoaderSettings
}

declare const THEME_CONFIG: Theme_Config

export const ThemeConfigConstants: Theme_Config = {
	...(typeof THEME_CONFIG === 'undefined' ? {} : THEME_CONFIG),
}
