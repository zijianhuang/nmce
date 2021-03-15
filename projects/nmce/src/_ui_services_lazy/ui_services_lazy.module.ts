import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../_directives/directives.module';

import {
	JsonComponent,
	JsonDiffComponent,
	HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent,
	DataComponentPrintDialog,
	LazyDataComponentDialog,

	HtmlFramePrintDialogService, HtmlHRefFramePrintDialogService, HtmlHRefPrintDialogComponent, HtmlPrintDialogComponent, HtmlImgPrintDialogComponent,
	DataComponentPrintDialogService,

	JsonDialogService,
	JsonDiffDialogService,
	LazyComponentPrintDialogService,

	LazyComponentDialogService,
	HtmlHRefPrintDialogService,
	HtmlPrintDialogService,
	HtmlImgPrintDialogService,
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
		DirectivesModule,
	],

	declarations: [

		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent, HtmlImgPrintDialogComponent,
		JsonComponent,
		JsonDiffComponent,
		LazyDataComponentDialog,
	],

	exports: [
		HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent, DataComponentPrintDialog, HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent,
		JsonComponent,
		JsonDiffComponent,
		LazyDataComponentDialog,
	],
	providers: [
		HtmlFramePrintDialogService, HtmlHRefFramePrintDialogService, DataComponentPrintDialogService, HtmlHRefPrintDialogService, HtmlPrintDialogService, HtmlImgPrintDialogService,
		JsonDialogService,
		JsonDiffDialogService,
		LazyComponentPrintDialogService,
		LazyComponentDialogService,
	],

})
export class UI_Lazy_ServicesModule { }
