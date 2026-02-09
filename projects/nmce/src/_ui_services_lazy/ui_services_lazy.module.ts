import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressComponent } from './progress.component';
import { DataComponentPrintDialog } from './dataComponentPrintDialog.component';
import { HtmlFramePrintDialogComponent, HtmlHRefFramePrintDialogComponent } from './htmlFramePrintDialog.component';
import { HtmlPrintDialogComponent, HtmlHRefPrintDialogComponent } from './htmlPrintDialogs.component';
import { HtmlImgPrintDialogComponent } from './htmlImgPrintDialog.component';

/**
 * Contain components for apps preferring importing module.
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
