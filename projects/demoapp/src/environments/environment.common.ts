export interface ThemesDic {
	[fileName: string]: {
		name?: string,
		dark?: boolean
	}
}

export interface ThemeDef {
	fileName: string;
	name?: string;
	dark?: boolean;
}

interface Site_Config {
	themesDic?: ThemesDic
}

declare const SITE_CONFIG: AppConfigConstantsType


interface AppConfigConstantsType extends Site_Config {
}

export const AppConfigConstants: AppConfigConstantsType = {
	...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
