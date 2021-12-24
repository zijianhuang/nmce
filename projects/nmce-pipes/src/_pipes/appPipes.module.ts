import { NgModule } from '@angular/core';
import {
	AudCurrencyPipe, CentToDollarPipe, FullDatePipe, InvoicePipe, LiteralDatePipe, MediumDatePipe, Short24Pipe, ShortDate24Pipe, ShortDatePipe, ShortDateTimePipe, ShortTimePipe
} from './index';


@NgModule({
	declarations: [ShortTimePipe, FullDatePipe, MediumDatePipe, ShortDatePipe, ShortDateTimePipe,
		AudCurrencyPipe, LiteralDatePipe,
		Short24Pipe, ShortDate24Pipe, InvoicePipe, CentToDollarPipe,
	],
	exports: [ShortTimePipe, FullDatePipe, MediumDatePipe, ShortDatePipe, AudCurrencyPipe, LiteralDatePipe, ShortDateTimePipe,
		Short24Pipe, ShortDate24Pipe, InvoicePipe, CentToDollarPipe

	],
})
export class NmcePipesModule {}
