import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	AutofocusDirective, CurrencyFormatterDirective, DataComponentDirective, ScrollIntoDirective
} from './index';



/**
 * Contain components. Other feature/lazy modules that need to access custom html element of components like my-datetimepicker still need to import this module explicitly.
 *
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],

	declarations: [
		AutofocusDirective,
		CurrencyFormatterDirective,
		ScrollIntoDirective,
		DataComponentDirective,
	],


	exports: [
		AutofocusDirective,
		CurrencyFormatterDirective,
		ScrollIntoDirective,
		DataComponentDirective,
	]
})
export class NmceDirectivesModule { }
