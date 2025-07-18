/**
 * String functions specific to Australia
 */
export class StringAusFunc {

	//thanks to https://github.com/sidorares/australian-business-number/blob/0591475f5978fd122b472edcdc7efe6d96d56f26/index.js
	private static acnWeights = [8, 7, 6, 5, 4, 3, 2, 1];
	private static weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

	private static suggestLookup: number[] = StringAusFunc.generateLookup();

	/**
	 * Validate medicare number
	 * @param n
	 * @returns validation error message
	 */
	static validateMedicare(n: string | null | undefined): { code: number, message: string } | null {
		if (!n) {
			return null;
		}

		if (n && n.length === 10) {
			const matches = n.match(/^(\d{8})(\d)/);

			if (!matches) {
				return {
					code: 2, message: 'Medicare number should be all digit.'
				};
			}

			const base = matches[1];
			const checkDigit = matches[2];
			const weights = [1, 3, 7, 9, 1, 3, 7, 9];

			let sum = 0;
			for (let i = 0; i < weights.length; i++) {
				sum += parseInt(base[i], 10) * weights[i];
			}

			//console.debug(`sum: ${sum}  checkDigits: ${checkDigit}`);
			const isValid = sum % 10 === parseInt(checkDigit, 10);
			if (!isValid) {
				return {
					code: 3, message: 'Checksum is incorrect.'
				};
			}
		} else {
			return { code: 1, message: 'Length should be 10.' };
		}

		return null;
	}

	static validateMedicareProviderNumber(providerNumber: string | null | undefined): { code: number, message: string } | null {
		if (!providerNumber) {
			return null;
		}

		if (!/^[0-9]{6}[0-9ABCDEFGHJKLMNPQRTUVWXY][ABFHJKLTWXY]/.test(providerNumber)) {
			return { code: 1, message: 'Not matching provider number format.' };
		}

		const practiceLocationValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y'];
		const remainderValues = ['Y', 'X', 'W', 'T', 'L', 'K', 'J', 'H', 'F', 'B', 'A'];
		const stemWeights = [3, 5, 8, 4, 2, 1];

		const stemNumbers = providerNumber.substr(0, 6).split('').map((char) => parseInt(char));
		const practiceLoc = practiceLocationValues.findIndex((e) => e === providerNumber[6]);
		const checksum = providerNumber[7];

		const zipped = stemWeights.map((x, i) => [x, stemNumbers[i]]);
		const sumWeights = zipped.map((y) => y[1] * y[0]).reduce((total, num) => total + num);
		const remainder = (sumWeights + practiceLoc * 6) % 11;

		const result = remainderValues[remainder];

		const valid = result === checksum;
		if (!valid) {
			return { code: 2, message: 'Checksum is incorrect.' };
		}

		return null;
	}

	static validateDVAFileNumber(dva: string | null | undefined): { code: number, message: string } | null {
		if (!dva) {
			return null;
		}

		const states = ['N', 'V', 'Q', 'S', 'W', 'T'];
		const warCodes = [' ', 'X', 'KM', 'SR', 'SS', 'SM', 'SWP', 'AGX', 'BW', 'GW', 'CGW', //Australian Forces
			'P', 'PX', 'PAD', 'PAM', 'PCA', 'PCR', 'PCV', 'PMS', 'PSW', 'PWO', 'HKX', 'MAL', //British Administration Group
			'CN', 'CNX', 'IV', 'NF', 'NG', 'RD', 'RDX', 'SA', 'SAX', 'A', //Other Overseas Forces
			'N', 'NX', 'NSW', 'NSM', //New Zealand Administration Group
			'BUR', 'CNK', 'CNS', 'FIJ', 'GHA', 'HKS', 'IND', 'KYA', 'MAU', 'MLS', 'MTX', 'MWI', 'NK', 'NGR', 'NRD', 'NSS', 'PK']//British Commonwealth Countries - SP Eligibility

		if (!states.includes(dva.charAt(0))) {
			return { code: 1, message: 'State incorrect.' };
		}

		const ns = dva.match(/\d+/);
		if (!ns) {
			return { code: 2, message: 'No number.' };
		}

		const n = ns[0];
		const idxOfN = dva.indexOf(n);
		const warCode = dva.substring(1, idxOfN);
		if (!warCodes.includes(warCode)) {
			return { code: 3, message: 'War code invalid.' }
		}

		const lenOfN = n.length;
		const lenOfWc = warCode.length;
		if (lenOfN + lenOfWc > 7) {
			return { code: 4, message: 'File number length should not be greater 7.' }
		}

		return null;
	}

	static validateTFN(n: string | null | undefined): { code: number, message: string } | null {
		if (!n) {
			return null;
		}

		const tfn = n.replace(/\s+/g, '').replace(/[-]/g, '');

		const isNumber = /^[0-9]+$/.test(tfn);
		if (!isNumber) {
			return { code: 1, message: 'Invalid TFN, only numbers are allowed.' };
		}

		const length = tfn.length;
		if (length !== 9) {
			return {
				code: 2, message: 'Invalid TFN, must have 9 digits.'
			};
		}

		const digits = tfn.split('').map(d => parseInt(d));

		const sum = (digits[0] * 1)
			+ (digits[1] * 4)
			+ (digits[2] * 3)
			+ (digits[3] * 7)
			+ (digits[4] * 5)
			+ (digits[5] * 8)
			+ (digits[6] * 6)
			+ (digits[7] * 9)
			+ (digits[8] * 10);

		const remainder = sum % 11;
		const valid = remainder === 0;
		if (!valid) {
			return { code: 3, message: 'Checksum is incorrect.' };
		}

		return null;
	}

	private static addWeighted(p: number, v: number, i: number) {
		return p + v * StringAusFunc.weights[i];
	}

	private static addAcnWeighted(p: number, v: number, i: number) {
		return p + v * StringAusFunc.acnWeights[i];
	}

	private static generateLookup(): number[] {
		const ns: number[] = [];
		for (let i = 0; i < 10; ++i) {
			ns[i * 19 % 89] = i;
		}

		return ns;
	}

	static validateABN(abn: string | null | undefined): { code: number, message: string } | null {
		if (!abn) {
			return null;
		}

		const digits = abn.replace(/[^\d]/g, '').split('').map(Number);
		if (digits.length !== 11) {
			return { code: 1, message: 'Expect 11-digit.' };
		}

		digits[0] -= 1;

		const sum = digits.reduce(StringAusFunc.addWeighted, 0);

		if (sum % 89 === 0) {
			return null;
		}

		digits[0] += 1;

		let sum1 = sum - digits[10] * StringAusFunc.weights[10];
		let digit = StringAusFunc.suggestLookup[89 - sum1 % 89];
		if (digit !== undefined) {
			return {
				code: 2,
				message: 'Checksum1 is incorrect.'
			}
		} else {
			const sum2 = sum1 - digits[9] * StringAusFunc.weights[9];
			for (let i = 0; i < 10; ++i) {
				sum1 = sum2 + i * StringAusFunc.weights[9];
				digit = StringAusFunc.suggestLookup[89 - sum1 % 89];
				if (digit !== undefined) {
					return {
						code: 3,
						message: 'Checksum2 is incorrect.'
					}
				}
			}
		}

		return null
	}

	static validateACN(acn: string | null | undefined): { code: number, message: string } | null {
		if (!acn) {
			return null;
		}

		const digits = acn.replace(/[^\d]/g, '').split('').map(Number);
		console.log(digits);
		if (digits.length !== 9) {
			return { code: 1, message: 'Expect 9-digit.' };
		}


		const sum = digits.slice(0, 8).reduce(StringAusFunc.addAcnWeighted, 0);
		const lastDigit = 10 - sum % 10;
		if (lastDigit === digits[8]) {
			return null;
		}

		return {
			code: 2,
			message: 'Checksum is incorrect.'
		};
	}
}
