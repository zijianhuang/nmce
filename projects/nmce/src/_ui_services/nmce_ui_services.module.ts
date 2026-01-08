import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemListDialogComponent } from './itemListDialog.component';
import { ConfirmComponent } from './confirm.component';
import { DataComponentDialog } from './dataComponentDialog.component';
import { DateHourRangePickerComponent } from './dateHourRangePicker.component';
import { DateRangePickerComponent } from './dateRangePicker.component';
import { HtmlDialogComponent } from './htmlDialog.component';
import { HtmlFrameDialogComponent, HtmlHRefFrameDialogComponent } from './htmlFrameDialog.component';
import { HtmlHRefDialogComponent } from './htmlHRefDialog.component';
import { HtmlImgDialogComponent } from './htmlImgDialog.component';
import { LocalTextEditorDialogComponent } from './localTextEditorDialog.component';
import { LogDialogComponent } from './logDialog.component';
import { LogSnackComponent } from './logSnack.component';
import { NotificationsComponent } from './notifications.component';
import { OptionsComponent } from './options.component';
import { PasswordsInputComponent } from './passwordsInput.component';
import { TextDialogComponent, TextHRefDialogComponent } from './textDialog.component';
import { TextInputComponent } from './textInput.component';
import { TimePickerComponent } from './timePicker.component';

/**
 * Contain components for apps preferring importing module.
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	
		HtmlDialogComponent,
		HtmlHRefDialogComponent,
		HtmlFrameDialogComponent,
		HtmlHRefFrameDialogComponent,
		TextDialogComponent,
		TextHRefDialogComponent,
		HtmlImgDialogComponent,

		ConfirmComponent,
		OptionsComponent,
		TextInputComponent,
		PasswordsInputComponent,

		LogDialogComponent,
		LogSnackComponent,

		NotificationsComponent,
		TimePickerComponent,
		DataComponentDialog,

		DateRangePickerComponent,
		DateHourRangePickerComponent,

		ItemListDialogComponent,
		LocalTextEditorDialogComponent,
	],

	exports: [
		HtmlDialogComponent,
		HtmlHRefDialogComponent,
		HtmlFrameDialogComponent,
		HtmlHRefFrameDialogComponent,
		HtmlImgDialogComponent,

		TextDialogComponent,
		TextHRefDialogComponent,

		ConfirmComponent,
		OptionsComponent,

		TextInputComponent,
		PasswordsInputComponent,

		LogDialogComponent,
		LogSnackComponent,

		NotificationsComponent,
		DataComponentDialog,

		DateRangePickerComponent,
		DateHourRangePickerComponent,

		LocalTextEditorDialogComponent,
	]

})
export class Nmce_UI_ServicesModule { }
