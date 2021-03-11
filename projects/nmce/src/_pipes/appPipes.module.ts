import { NgModule } from '@angular/core';

import {
	ShortTimePipe, FullDatePipe, MediumDatePipe, ShortDatePipe, LiteralDatePipe, ShortDateTimePipe,
	Short24Pipe, ShortDate24Pipe,
	AudCurrencyPipe, InvoicePipe,
} from './index';

@NgModule({
	declarations: [ShortTimePipe, FullDatePipe, MediumDatePipe, ShortDatePipe, ShortDateTimePipe,
		AudCurrencyPipe, LiteralDatePipe,
		Short24Pipe, ShortDate24Pipe, InvoicePipe
	],
	exports: [ShortTimePipe, FullDatePipe, MediumDatePipe, ShortDatePipe, AudCurrencyPipe, LiteralDatePipe, ShortDateTimePipe,
		Short24Pipe, ShortDate24Pipe, InvoicePipe

	],
})
export class AppPipesModule {}
