import { NgModule } from '@angular/core';
import {
	LiteralDatePipe,  PadPipe, BankerRoundPipe
	 
} from './index';


@NgModule({
	declarations: [
		LiteralDatePipe, PadPipe, BankerRoundPipe,
	],
	exports: [ LiteralDatePipe, PadPipe, BankerRoundPipe	],
})
export class NmcePipesModule {}
