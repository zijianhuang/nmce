import { ThemesDic } from "./themeDef"

interface Site_Config {
	themesDic?: ThemesDic
}

interface AppConfigConstantsType extends Site_Config {
}

declare const SITE_CONFIG: AppConfigConstantsType

export const AppConfigConstants: AppConfigConstantsType = {
	...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
