import { DateFunc} from './dateFunc';

export class JSFunc {
	static groupBy<T>(array: Array<T>, propertyName: string) {
		return array.reduce(function(acc, obj) {
			const key = obj[propertyName];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	}

	/**
	 * Group by a date property. The key is always of string type and representing milliseconds. The client should convert the string to number.
	 * Angular date pipe could actually consume such string without explicitly converting to number.
	 * @param array
	 * @param propertyName
	 */
	static groupByDate<T>(array: Array<T>, propertyName: string) {
		return array.reduce(function(acc, obj) {
			const key = DateFunc.dateTimeUtcToLocalDateNumber(obj[propertyName]);
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	}

	static removeNullOrEmptyFields(obj: any) {
		for (const f in obj) {
			if (obj[f] === null || obj[f]==='') {
				delete obj[f];
			}
		}
	}

	static removeNullFields(obj: any) {
		for (const f in obj) {
			if (obj[f] === null) {
				delete obj[f];
			}
		}
	}

}
