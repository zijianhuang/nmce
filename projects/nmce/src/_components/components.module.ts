import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import {
	AlertComponent, MonthYearExpiryComponent, NotFoundComponent,



	PrintComponent, WaitComponent, WaitProgressComponent, WIPComponent
} from './index';


/**
 * Contain components. Other feature modules that need to access custom html element of components like my-datetimepicker still need to import this module explicitly.
 * It is a bit strange that Ng2 could pick this module up though I had explicitly import it only in ml_appointments.module for datetime picker.???
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NGMDModule,
		ReactiveFormsModule,
	],

	declarations: [
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
	],

	providers: [
	],

})
export class NmceComponentsModule { }
