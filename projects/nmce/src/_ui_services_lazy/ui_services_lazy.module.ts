import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';

import { ProgressComponent, ProgressDialogService } from './progress.component';
import { DataComponentPrintDialog, DataComponentPrintDialogService } from './dataComponentPrintDialog.component';
import { HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, HtmlFramePrintDialogService, HtmlHRefFramePrintDialogService } from './htmlFramePrintDialog.component';
import { HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent, HtmlHRefPrintDialogService, HtmlPrintDialogService, HtmlImgPrintDialogService } from './htmlPrintDialog.component';
import { LazyComponentDialogService } from './lazy-component-dialog.service';
import { LazyComponentPrintDialogService } from './lazy-component-print-dialog.service';


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
	
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, 
		HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent,
		ProgressComponent,
	],

	exports: [
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, 
		HtmlHRefPrintDialogComponent, ProgressComponent,
	],
	providers: [
		HtmlFramePrintDialogService, HtmlHRefFramePrintDialogService, DataComponentPrintDialogService, HtmlHRefPrintDialogService, HtmlPrintDialogService, HtmlImgPrintDialogService,
		LazyComponentPrintDialogService,
		LazyComponentDialogService,
		ProgressDialogService,
	],

})
export class Nmce_UI_Lazy_ServicesModule { }
