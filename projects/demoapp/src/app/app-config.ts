export class APP_DI_CONFIG {
	static get selectedTheme(): string | null {
		return localStorage.getItem('nmcedemoapp.theme');
	};
	static set selectedTheme(v: string) {
		localStorage.setItem('nmcedemoapp.theme', v);
	};
}
