import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NmceDirectivesModule } from 'nmce-directives';
import { NGMDModule } from '../ngmd.module';
import {
	DataComponentPrintDialog, DataComponentPrintDialogService, HtmlFramePrintDialogComponent,
	HtmlFramePrintDialogService, HtmlHRefFramePrintDialogComponent, HtmlHRefFramePrintDialogService, HtmlHRefPrintDialogComponent, HtmlHRefPrintDialogService, HtmlImgPrintDialogComponent, HtmlImgPrintDialogService, HtmlPrintDialogComponent, HtmlPrintDialogService, LazyComponentDialogService, LazyComponentPrintDialogService
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
		FlexLayoutModule,
		ReactiveFormsModule,
		NmceDirectivesModule,
	],

	declarations: [

		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent,
		//JsonComponent,
	],

	exports: [
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent,
		//JsonComponent,
	],
	providers: [
		HtmlFramePrintDialogService, HtmlHRefFramePrintDialogService, DataComponentPrintDialogService, HtmlHRefPrintDialogService, HtmlPrintDialogService, HtmlImgPrintDialogService,
		//JsonDialogService,
		LazyComponentPrintDialogService,
		LazyComponentDialogService,
	],

})
export class Nmce_UI_Lazy_ServicesModule { }
