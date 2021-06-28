export class AddressFunc {
	/**
	 * Compose to one line separated by comma
	 * @param st1
	 * @param st2
	 * @param city
	 * @param state
	 * @param postcode
	 */
	static composeOneLineAddress(st1: string | undefined, st2: string | undefined, city: string | undefined, state: string | undefined, postcode: string | undefined): string {
		return AddressFunc.composeAddress(st1, st2, city, state, postcode, ', ');
	}

	/**
	 * Compose to multiple separated by \n
	 * @param st1
	 * @param st2
	 * @param city
	 * @param state
	 * @param postcode
	 */
	static composeMultiLineAddress(st1: string | undefined, st2: string | undefined, city: string | undefined, state: string | undefined, postcode: string | undefined): string {
		return AddressFunc.composeAddress(st1, st2, city, state, postcode, '\n');
	}

	/**
	 * Compose with separator
	 * @param st1
	 * @param st2
	 * @param city
	 * @param state
	 * @param postcode
	 * @param sep
	 */
	static composeAddress(st1: string | undefined, st2: string | undefined, city: string | undefined, state: string | undefined, postcode: string | undefined, sep: string | undefined): string {
		const r = (st1 ? (st1 + sep) : '') + (st2 ? (st2 + sep) : '') + (city ? (city + sep) : '') + (state ? (state + ' ') : '') + (postcode ? postcode : '');
		return r;
	}

	static composeGoogleMapsAuUrl(st1: string | undefined, st2: string | undefined, city: string | undefined, state: string | undefined, country: string | undefined): string {
		const googleBaseUrl = 'https://www.google.com.au/maps?hl=en&q=';
		const fff = (s: string | undefined): string => {
			if (!s) {
				return '';
			}

			return '+' + encodeURIComponent(s.replace(' ', '+')) + ',';
		};

		const ss = fff(st1) + fff(st2) + fff(city) + fff(state) + fff(country);
		return googleBaseUrl + ss;
	}

}
