import '@angular/localize/init';
import { StringFunc } from './stringFunc';

class MyStatus {
	static description = '12AB';
	static integer = 8;
	static something: string; //without instance, this does not count
	static something2: string=undefined!; //this count

	private static _currentCalendarView = '';
	static get currentCalendarView(): string {
		const v = MyStatus._currentCalendarView;
		return v ? v : 'month';
	}
	static set currentCalendarView(v: string) {
		MyStatus._currentCalendarView = v;
	}

	static clear() {
		for (const key in MyStatus) {
			const p =key as keyof MyStatus;
 {/* 
  // @ts-ignore */}
   			MyStatus[p] = undefined;
		}
	}
}

describe('1st tests', () => {
	it('true is true', () => expect(true).toBe(true));

	it('static variable', () => {
		const staticKeys = Object.keys(MyStatus);
		expect(staticKeys.length).toEqual(5); // something is not counted.
		const p = staticKeys[0] as keyof MyStatus;
		expect(MyStatus[p]).toEqual('12AB');
		expect(MyStatus.something).toBeUndefined();
	});

	it('static variable clear', () => {
		const staticKeys = Object.keys(MyStatus);
		MyStatus.currentCalendarView = 'kkkkk';

		MyStatus.clear();

		expect(MyStatus.description).toBeUndefined();
		expect(staticKeys.length).toEqual(5); // something is not counted
		const p = staticKeys[0] as keyof MyStatus;
		expect(MyStatus[p]).toBeUndefined();
		expect(MyStatus.currentCalendarView).toEqual('month');

		MyStatus.description = '12AB'; // sometimes this test runs first, causing the first test failed.
	})
});

describe('stringFunc', () => {
	it('getAbbr', () => {
		expect(StringFunc.getAbbr('John Smith')).toEqual('JS');
		expect(StringFunc.getAbbr('Huang, Zijian')).toEqual('ZH');
		expect(StringFunc.getAbbr('')).toEqual('');
		expect(StringFunc.getAbbr('John')).toEqual('J');
	});

	it('getOneLineDigest', () => {
		expect(StringFunc.getOneLineDigest('', 32)).toEqual('');
		expect(StringFunc.getOneLineDigest(undefined, 32)).toBe('');
		expect(StringFunc.getOneLineDigest(null, 32)).toBe('');
		expect(StringFunc.getOneLineDigest('Abcd efg', 32)).toEqual('Abcd efg');
		expect(StringFunc.getOneLineDigest('Abcd\nefg', 32)).toEqual('Abcd efg');
		expect(StringFunc.getOneLineDigest('123456789 123456789 123456789 123456789 ', 32)).toEqual('123456789 123456789 123456789 12...');
		expect(StringFunc.getOneLineDigest('123456789\n123456789\n123456789\n123456789 ', 32)).toEqual('123456789 123456789 123456789 12...');
	});

	it('capitalize', () => {
		expect(StringFunc.capitalizeWords('some thing')).toBe('Some Thing');
		expect(StringFunc.capitalizeWords('3ome thing')).toBe('3ome Thing');
		expect(StringFunc.capitalizeWords('località àtilacol')).toBe('Località Àtilacol');
		expect(StringFunc.capitalizeWords('中文 好')).toBe('中文 好');
		expect(StringFunc.capitalizeWords('')).toBe('');
		expect(StringFunc.capitalizeWords(undefined)).toBeUndefined();
		expect(StringFunc.capitalizeWords(null)).toBeNull();
	});
});
