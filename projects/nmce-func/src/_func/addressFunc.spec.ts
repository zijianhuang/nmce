import { AddressFunc } from './addressFunc';


describe('addressFunc', () => {
	it('composeOneLineAddress', () => {
		expect(AddressFunc.composeOneLineAddress('NoName St', '', 'Brisbane', 'QLD', '4000')).toEqual('NoName St, Brisbane, QLD 4000');
	});

	it('composeGoogleMapsUrl', () => {
		expect(AddressFunc.composeGoogleMapsAuUrl('NoName St', '', 'Brisbane', 'QLD', 'Australia')).toEqual('https://www.google.com.au/maps?hl=en&q=+NoName%2BSt,+Brisbane,+QLD,+Australia,');
	});
});
