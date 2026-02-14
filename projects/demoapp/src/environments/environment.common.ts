export interface ThemeDef {
	fileName: string;
	/** Display name */
	name?: string;
	/** Dark them or not */
	dark?: boolean;
}

export interface ThemesDic {
	[fileName: string]: {
		name?: string,
		dark?: boolean
	}
}

interface Site_Config {
	themesDic?: ThemesDic
}

interface AppConfigConstantsType extends Site_Config {
}

declare const SITE_CONFIG: AppConfigConstantsType

export const AppConfigConstants: AppConfigConstantsType = {
	...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
