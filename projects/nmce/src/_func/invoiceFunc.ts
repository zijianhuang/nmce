import * as namespaces from '../../clientapi/WebApiNG2ClientAuto';
import APS_WebPos_WebApi_Controllers_ML_Client = namespaces.APS_WebPos_WebApi_Controllers_ML_Client;
import APS_WebPos_Services_ML_Client = namespaces.APS_WebPos_Services_ML_Client;

export class InvoiceFunc {
	static sumTotalAmount(invoice: APS_WebPos_Services_ML_Client.ML_Invoice): number {
		if (!invoice) {
			return 0;
		}

		if (!invoice.items) {
			return 0;
		}

		return invoice.items.map(v => v.amount).reduce((a, b) => a + b, 0);
	}

	static sumTotalTax(invoice: APS_WebPos_Services_ML_Client.ML_Invoice): number {
		if (!invoice) {
			return 0;
		}

		if (!invoice.items) {
			return 0;
		}

		return invoice.items.map(v => v.tax).reduce((a, b) => a + b, 0);
	}

	/**
	 * sumTotalAmountPaid in payments of positive amount of the invoice
	 * @param invoice
	 */
	static sumTotalAmountPaid(invoice: APS_WebPos_Services_ML_Client.ML_Invoice): number {
		if (!invoice) {
			return 0;
		}

		if (!invoice.payments) {
			return 0;
		}

		return invoice.payments.map(v => v.amount).reduce((a, b) => a + b, 0);
	}

}
