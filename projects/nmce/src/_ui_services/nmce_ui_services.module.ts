import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	ConfirmComponent,
	DataComponentDialog,
	DateHourRangePickerComponent,
	DateRangePickerComponent,
	HtmlDialogComponent,
	HtmlFrameDialogComponent,
	HtmlHRefDialogComponent,
	HtmlHRefFrameDialogComponent,
	HtmlImgDialogComponent, 

	LocalTextEditorDialogComponent, LogDialogComponent, LogSnackComponent,
	NotificationsComponent,

	OptionsComponent,
	PasswordsInputComponent,
	TextDialogComponent,
	TextHRefDialogComponent,
	TextInputComponent,
	TimePickerComponent} from './index';
import { ItemListDialogComponent } from './itemListDialog.component';

/**
 * Contain components. Other feature modules that need to access custom html element of components like my-datetimepicker still need to import this module explicitly.
 * It is a bit strange that Ng2 could pick this module up though I had explicitly import it only in ml_appointments.module for datetime picker.???
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
