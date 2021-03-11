export interface DisplayOption {
	value: string; display: string;
}


export class LookupFunc {
	private static _genderOptions: DisplayOption[] = [
		{ value: 'M', display: 'Male' },
		{ value: 'F', display: 'Female' },
		{ value: 'I', display: 'Indeterminate' },
		{ value: 'U', display: 'Unknown' },
	];

	private static _entitlements: DisplayOption[] = [
		{ value: 'PTEC', display: 'Gold Card' },
		{ value: 'STEC', display: 'White Card' },
		{ value: 'RPBC', display: 'Orange Card' },
		{ value: 'PCC', display: 'Pensioner Concession Card' },
		{ value: 'CSHC', display: 'Commonwealth Seniors Healthcare Card' },
		{ value: 'NIL', display: 'Unknown' },
	];

	private static _entitlementsDic: { [key: string]: string } = LookupFunc._entitlements.reduce(function (r, e) { // array to dic.
		r[e.value] = e.display;
		return r;
	}, {});

	static get genderOptions(): DisplayOption[] {
		return LookupFunc._genderOptions;
	};

	/**
	 *
	 * @param genderOption m, f, i, u
	 */
	static mapToMedicareSex(genderOption: string): string {
		if (!genderOption) {
			return undefined;
		}

		switch (genderOption) {
			case 'M': return '1';
			case 'F': return '2';
			case 'I': return '3';
			case 'U': return '9';
			default:
				return undefined;
		}
	}


	static get dvaEntitlements(): DisplayOption[] {
		return LookupFunc._entitlements;
	}

	static get dvaEntitlementsDic(): { [key: string]: string } {
		return LookupFunc._entitlementsDic;
	}

}
