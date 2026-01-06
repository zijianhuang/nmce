import { NgModule } from '@angular/core';
import { PadPipe, BankerRoundPipe, LiteralDatePipe } from './public-api';

/**
 * Contain components for apps preferring importing module.
 */
@NgModule({
	imports: [
		BankerRoundPipe,
		LiteralDatePipe,
		PadPipe
	],

	exports: [
		BankerRoundPipe,
		LiteralDatePipe,
		PadPipe
	]
})
export class NmcePipesModule { }
