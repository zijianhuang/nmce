import { DateFunc } from './dateFunc';

export class JSFunc {
	static groupBy<T>(array: Array<T>, propertyName: string) {
		return array.reduce(function(acc: any, obj: any) {
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
		return array.reduce(function(acc: any, obj: any) {
			const key = DateFunc.dateTimeUtcToLocalDateNumber(obj[propertyName]);
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	}

	/**
	 * Remove null or empty fields including those in nested objects.
	 * @param obj 
	 */
	static removeNullOrEmptyFields(obj: any) {
		for (const f in obj) {
			let p = obj[f];
			if (p === null || p === '') {
				delete obj[f];
			} else if (typeof p === 'object' && p !== null) {
				this.removeNullOrEmptyFields(p);
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
