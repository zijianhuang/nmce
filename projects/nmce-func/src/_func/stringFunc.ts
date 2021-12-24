export class StringFunc {

	/**
	 * Up to 2 letters. For John Smith, returns JS, for Huang, Zijian, returns ZH
	 * @param s
	 */
	static getAbbr(s: string | null | undefined) {
		if (!s) {
			return '';
		}

		const sArray = s.split(/[\s,]+/);
		const comma = s.indexOf(',') >= 0;

		if (sArray.length === 1) {
			return sArray[0][0];
		}

		return comma ? sArray[1][0] + sArray[0][0] : sArray[0][0] + sArray[1][0];
	}

	/**
	 * A substring with line breaks replaced by space.
	 * @param s
	 * @param length
	 * @returns result, or empty string if the input is empty, null or undefined
	 */
	static getOneLineDigest(s: string | null | undefined, length: number) {
		if (!s) {
			return '';
		}

		const ss = s.substring(0, length);
		const st = ss.replace(new RegExp('\n', 'g'), ' ') + ((s.length > length) ? '...' : '');
		return st.trim();
	}

	/**
	 * Remove line breaks and econde with encodeURI() so the data could be saved in Azure as meta. If the string is truncated, the return will have ... suffix.
	 * @param s
	 * @param length
	 * @returns result, or empty string if the input is empty, null or undefined
	 */
	static getOneLineDigestOfHtml(s: string | null | undefined, length: number) {
		if (!s) {
			return '';
		}

		const ss = s.substring(0, length);
		const st = ss.replace(new RegExp('\n', 'g'), ' ') + ((s.length > length) ? '...' : '');
		return encodeURI(st.trim()); //need to encode in order to save as meta in Azure.
	}

	static pad(num: number | undefined, size: number): string {
		if (num == null) {
			return '';
		}

		let s = num + '';
		while (s.length < size) { s = '0' + s; }
		return s;
	}

	/**
	 * get plain text of HTML content
	 * @param s
	 * @returns result. If input is empty, null, or undefined, return the same.
	 */
	static getHtmlPlainText(s: string | null | undefined): string | null {
		if (!s) {
			return null;
		}

		const parser = new DOMParser();
		const html = parser.parseFromString(s, 'text/html');
		return html.body.textContent;
	}

	/**
	 *
	 * @param s
	 * @returns result. If input is empty, null, or undefined, return the same.
	 */
	static capitalizeWords(s: string | null | undefined): string | null | undefined { // thanks to https://stackoverflow.com/questions/2332811/capitalize-words-in-string
		if (!s) {
			return s;
		}

		return s.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
	}

	static validateEmail(email: string | null | undefined): boolean {
		if (!email) {
			return true;
		}
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	}
}
