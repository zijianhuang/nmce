import { NgModule } from '@angular/core';
import {
	AudCurrencyPipe, CentToDollarPipe,  LiteralDatePipe,  PadPipe, BankerRoundPipe
	 
} from './index';


@NgModule({
	declarations: [
		AudCurrencyPipe, LiteralDatePipe,
		PadPipe, CentToDollarPipe, BankerRoundPipe,
	],
	exports: [ AudCurrencyPipe, LiteralDatePipe, PadPipe, CentToDollarPipe, BankerRoundPipe	],
})
export class NmcePipesModule {}
