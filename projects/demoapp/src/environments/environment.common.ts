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

interface AppConfigConstantsType extends Site_Config {
}

export const AppConfigConstants: AppConfigConstantsType = {

}
