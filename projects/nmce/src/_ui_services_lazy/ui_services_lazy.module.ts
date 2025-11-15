import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressComponent } from './progress.component';
import { DataComponentPrintDialog } from './dataComponentPrintDialog.component';
import { HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent } from './htmlFramePrintDialog.component';
import { HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent } from './htmlPrintDialog.component';


/**
 * Contain components. Other feature modules that need to access custom html element of components like my-datetimepicker still need to import this module explicitly.
 * It is a bit strange that Ng2 could pick this module up though I had explicitly import it only in ml_appointments.module for datetime picker.???
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, 
		HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent,
		ProgressComponent,
	],

	exports: [
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, 
		HtmlHRefPrintDialogComponent, ProgressComponent,
	]

})
export class Nmce_UI_Lazy_ServicesModule { }
