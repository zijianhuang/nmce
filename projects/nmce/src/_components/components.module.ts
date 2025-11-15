import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	AlertComponent, MonthYearExpiryComponent, NotFoundComponent,
	PrintComponent, WaitComponent, WaitProgressComponent, WIPComponent
} from './index';

/**
 * Contain components for apps preferring importing module.
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		AlertComponent,
		NotFoundComponent, WIPComponent,
		WaitComponent,
		WaitProgressComponent,
		MonthYearExpiryComponent,
		PrintComponent,
	],

	exports: [
		NotFoundComponent, WIPComponent,
		WaitComponent,
		WaitProgressComponent,
		MonthYearExpiryComponent,
		AlertComponent, //need to export the entry component
		PrintComponent,
	]
})
export class NmceComponentsModule { }
