import * as namespaces from '../../clientapi/WebApiNG2ClientAuto';
import APS_WebPos_WebApi_Controllers_Client = namespaces.APS_WebPos_WebApi_Controllers_Client;
import APS_WebPos_Services_Client = namespaces.APS_WebPos_Services_Client;

export class ClInvoiceFunc {
	static sumTotalAmount(invoice: APS_WebPos_Services_Client.Invoice): number {
		if (!invoice) {
			return 0;
		}

		if (!invoice.items) {
			return 0;
		}

		return invoice.items.map(v => v.amount).reduce((a, b) => a + b, 0);
	}

	static sumTotalTax(invoice: APS_WebPos_Services_Client.Invoice): number {
		if (!invoice) {
			return 0;
		}

		if (!invoice.items) {
			return 0;
		}

		return invoice.items.map(v => v.tax).reduce((a, b) => a + b, 0);
	}

	///**
	// * sumTotalAmountPaid in payments of positive amount of the invoice
	// * @param invoice
	// */
	//static sumTotalAmountPaid(invoice: APS_WebPos_Services_Client.Invoice): number {
	//	if (!invoice) {
	//		return 0;
	//	}

	//	if (!invoice.invoicePaymentJunction) {
	//		return 0;
	//	}

	//	return invoice.invoicePaymentJunction.map(v => v.amount).reduce((a, b) => a + b, 0);
	//}

}
