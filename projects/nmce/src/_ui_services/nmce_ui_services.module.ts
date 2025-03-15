import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NmceDirectivesModule } from 'nmce-directives';
import { NGMDModule } from '../ngmd.module';
import {
	ConfirmComponent,
	ConfirmService,
	DataComponentDialog,
	DataComponentDialogService,
	DateHourRangePickerComponent,
	DateHourRangePickerService, DateRangePickerComponent,
	DateRangePickerService,
	HtmlDialogComponent,
	HtmlDialogService, HtmlFrameDialogComponent,
	HtmlFrameDialogService, HtmlHRefDialogComponent,
	HtmlHRefDialogService, HtmlHRefFrameDialogComponent,
	HtmlHRefFrameDialogService, HtmlImgDialogComponent, HtmlImgDialogService,

	LocalAlertService,
	LocalTextEditorDialogComponent, LocalTextEditorDialogService, LogDialogComponent, LogSnackComponent,
	NotificationsComponent,


	OptionListDialogService, OptionsComponent,
	OptionsService, PasswordsInputComponent,
	PasswordsInputService, TextDialogComponent,
	TextDialogService, TextHRefDialogComponent,
	TextHReflDialogService, TextInputComponent,
	TextInputService, TimePickerComponent,
	TimeService
} from './index';
import { ItemListDialogComponent } from './itemListDialog.component';

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
		NmceDirectivesModule,
	],

	declarations: [
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
	],
	providers: [
		//{
		//	provide: MY_DIALOG_OPTIONS, useValue: { useIcon: false }
		//},

		NotificationsComponent,
		TextInputService,
		PasswordsInputService,
		TimeService,

		LocalAlertService,
		ConfirmService,
		OptionsService,
		HtmlFrameDialogService,
		HtmlHRefFrameDialogService,
		HtmlHRefDialogService,
		HtmlDialogService,
		HtmlDialogService,
		TextHReflDialogService,
		TextDialogService,
		HtmlImgDialogService,

		DataComponentDialogService,

		DateRangePickerService,
		DateHourRangePickerService,


		LocalTextEditorDialogService,
		OptionListDialogService,
	],

})
export class Nmce_UI_ServicesModule { }
