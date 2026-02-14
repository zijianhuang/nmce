export interface ThemeDef {
	/** Relative path or URL to CDN */
	filePath: string;
	/** Display name */
	display?: string;
	/** Dark them or not */
	dark?: boolean;
}

export interface ThemesDic {
	[filePath: string]: {
		display?: string,
		dark?: boolean
	}
}