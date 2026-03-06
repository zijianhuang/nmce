export interface ThemeValue {
	/** Display name */
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

export interface ThemeKeys {
	storageKey: string;
	themeLinkId: string;

	/** 
	 * Optionally the app may has an app level colors CSS declaring colors neutral to the light or dark theme, in addition to a prebuilt theme
	 * If some colors need to adapt the light or dark theme, having those colors declared in colorsCss and colorsDarkCss is convenient for SDLC, since you can
	 * use tools to flip colors for dark or light, while keeping app colors neutral to dark or light.
	 */
	appColorsLinkId?: string;
	
	/** Optionally the app may has an app level colors CSS declaring colors adapting to the light theme */
	colorsCss?: string;

	/** Optionally the app may has an app level colors CSS declaring colors adapting to the dark theme */
	colorsDarkCss?: string;
}