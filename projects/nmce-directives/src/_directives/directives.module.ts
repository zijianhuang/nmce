import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {
	AutofocusDirective, HighlightDirective, CurrencyFormatterDirective, DatetimeFormatterDirective, ScrollIntoDirective, DataComponentDirective,
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
		HighlightDirective,
		CurrencyFormatterDirective,
		DatetimeFormatterDirective,
		ScrollIntoDirective,
		DataComponentDirective,
	],


	exports: [
		AutofocusDirective,
		HighlightDirective,
		CurrencyFormatterDirective,
		DatetimeFormatterDirective,
		ScrollIntoDirective,
		DataComponentDirective,
	]
})
export class NmceDirectivesModule { }
