import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import {
	DataComponentPrintDialog, DataComponentPrintDialogService, HtmlFramePrintDialogComponent,
	HtmlFramePrintDialogService, HtmlHRefFramePrintDialogComponent, HtmlHRefFramePrintDialogService, HtmlHRefPrintDialogComponent, HtmlHRefPrintDialogService, HtmlImgPrintDialogComponent, HtmlImgPrintDialogService, HtmlPrintDialogComponent, HtmlPrintDialogService, LazyComponentDialogService, LazyComponentPrintDialogService
} from './index';
import { ProgressComponent, ProgressDialogService } from './progress.component';


/**
 * Contain components. Other feature modules that need to access custom html element of components like my-datetimepicker still need to import this module explicitly.
 * It is a bit strange that Ng2 could pick this module up though I had explicitly import it only in ml_appointments.module for datetime picker.???
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NGMDModule,
		ReactiveFormsModule
	],

	declarations: [

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
