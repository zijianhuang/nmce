import '@angular/localize/init';
import { StringAusFunc } from './stringAusFunc';

describe('stringAusFunc', () => {
	it('validateMedicare', () => {
		expect(StringAusFunc.validateMedicare('2950974202')).toBeNull();
		expect(StringAusFunc.validateMedicare('3950386862')).toBeNull();
		expect(StringAusFunc.validateMedicare('2950974392')).toBeNull();
		expect(StringAusFunc.validateMedicare('3950386952')).toBeNull();

		expect(StringAusFunc.validateMedicare('950386952')?.code).toBe(1);
		expect(StringAusFunc.validateMedicare('33950386952')?.code).toBe(1);
		expect(StringAusFunc.validateMedicare('aaaaaaaaaa')?.code).toBe(2);
		expect(StringAusFunc.validateMedicare('3333333333')?.code).toBe(3);
		expect(StringAusFunc.validateMedicare('3950386923')?.code).toBe(3);
	});

	it('validateProviderCode', () => {
		expect(StringAusFunc.validateMedicareProviderNumber('2426591T')).toBeNull();
		expect(StringAusFunc.validateMedicareProviderNumber('2426601H')).toBeNull();
		expect(StringAusFunc.validateMedicareProviderNumber('2423391B')).toBeNull();
		expect(StringAusFunc.validateMedicareProviderNumber('3323391B')?.code).toBe(2);
		expect(StringAusFunc.validateMedicareProviderNumber('3391B')?.code).toBe(1);
	});

	it('validateTFN', () => {
		expect(StringAusFunc.validateTFN('123456782')).toBeNull();
		expect(StringAusFunc.validateTFN('123 456-782')).toBeNull();
		expect(StringAusFunc.validateTFN('a3323391B')?.code).toBe(1);
		expect(StringAusFunc.validateTFN('3391')?.code).toBe(2);
		expect(StringAusFunc.validateTFN('123456783')?.code).toBe(3);
	});

	it('validateABN', () => {
		expect(StringAusFunc.validateABN('51824753556')).toBeNull();
		expect(StringAusFunc.validateABN('51 824 753 556')).toBeNull();
		expect(StringAusFunc.validateABN('51-824 753 556')).toBeNull();
		expect(StringAusFunc.validateABN('5182475355')?.code).toBe(1);
		expect(StringAusFunc.validateABN('51824753557')?.code).toBe(2);
	});

	it('validateACN', () => {
		expect(StringAusFunc.validateACN('003 249 992')).toBeNull();
		expect(StringAusFunc.validateACN('005999977')).toBeNull();
		expect(StringAusFunc.validateACN('010.499-966')).toBeNull();
		expect(StringAusFunc.validateACN('00599997')?.code).toBe(1);
		expect(StringAusFunc.validateACN('005999979')?.code).toBe(2);
	});

	it('validateDVAFileNumber', () => {
		expect(StringAusFunc.validateDVAFileNumber('QX901533')).toBeNull();
		expect(StringAusFunc.validateDVAFileNumber('W 1')).toBeNull();
		expect(StringAusFunc.validateDVAFileNumber('SCGW1234')).toBeNull();
		expect(StringAusFunc.validateDVAFileNumber('SCGW1234B')).toBeNull();
		expect(StringAusFunc.validateDVAFileNumber('ZX901533')?.code).toBe(1);
		expect(StringAusFunc.validateDVAFileNumber('QX90153C')).toBeNull();
		expect(StringAusFunc.validateDVAFileNumber('NKKK1533')?.code).toBe(3);
		expect(StringAusFunc.validateDVAFileNumber('WK153344')?.code).toBe(3);
		expect(StringAusFunc.validateDVAFileNumber('TX1533444')?.code).toBe(4);
		expect(StringAusFunc.validateDVAFileNumber('VXabcde')?.code).toBe(2);
	});



});
