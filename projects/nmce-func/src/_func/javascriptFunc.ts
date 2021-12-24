export class JavaScriptFunc {
	/**
	 * Some business functions depend on external JavaScript libraries. Lazy loading of respective business modules is good, 
	 * and this function supports lazy loading of JS libraries.
	 * @param scriptUrl 
	 * @returns Promise for subsequent JS function calls.
	 */
	static loadExternalScript(scriptUrl: string) {
		return new Promise((resolve, reject) => {
			const scriptElement = document.createElement('script');
			scriptElement.src = scriptUrl;
			scriptElement.onload = resolve;
			document.body.appendChild(scriptElement);
		});
	}
}
