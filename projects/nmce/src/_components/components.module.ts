import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert.component';
import { MonthYearExpiryComponent } from './monthYearExpiry.component';
import { NotFoundComponent } from './notFound.component';
import { PrintComponent } from './print.component';
import { WaitComponent } from './wait.component';
import { WaitProgressComponent } from './waitProgress.component';
import { WIPComponent } from './wip.component';

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
		AlertComponent,
		PrintComponent,
	]
})
export class NmceComponentsModule { }
