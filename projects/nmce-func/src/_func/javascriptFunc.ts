export class JavaScriptFunc {
	/**
	 * Some business functions depend on external JavaScript libraries. Lazy loading of respective business modules is good, 
	 * and this function supports lazy loading of JS libraries.
	 * @param scriptUrl 
	 * @param type things like module.
	 * @returns Promise for subsequent JS function calls.
	 */
	static loadExternalScript(scriptUrl: string, type?: string) {
		return new Promise((resolve, reject) => {
			const scriptElement = document.createElement('script');
			if (type){
				scriptElement.type=type;
			}

			scriptElement.src = scriptUrl;
			scriptElement.onload = resolve;
			document.body.appendChild(scriptElement);
		});
	}
}
