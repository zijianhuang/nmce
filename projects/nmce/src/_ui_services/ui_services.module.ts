import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NGMDModule } from '../ngmd.module';
import { DirectivesModule } from 'nmce-directives';
import {
	AlertService,
	ConfirmComponent,
	ConfirmService,
	DataComponentDialog,
	DataComponentDialogService,
	DateHourRangePickerComponent,
	DateHourRangePickerService, DateRangePickerComponent,
	DateRangePickerService, 
	EmailConfirmComponent,
	EmailConfirmService,
	HtmlDialogComponent,
	HtmlDialogService, HtmlFrameDialogComponent,
	HtmlFrameDialogService, HtmlHRefDialogComponent,
	HtmlHRefDialogService, HtmlHRefFrameDialogComponent, HtmlImgDialogComponent, HtmlImgDialogService,
	HtmlHRefFrameDialogService,
	LocalDocEditorDialogService, LocalDocHtmlEditorDialogComponent,
	LocalAlertService, LogDialogComponent, LogSnackComponent,
	NotificationsComponent,
	NotificationsService, OptionsComponent,
	OptionsService, PasswordsInputComponent,
	PasswordsInputService, TextDialogComponent,
	TextDialogService, TextHRefDialogComponent,
	TextHReflDialogService, TextInputComponent,
	TextInputService, TimePickerComponent,
	TimeService,
	WaitProgressService, WaitService,
	OptionListDialogService,
	LocalTextEditorDialogComponent, LocalTextEditorDialogService,

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
		FlexLayoutModule,
		ReactiveFormsModule,
		DirectivesModule,
		AngularEditorModule,
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
		EmailConfirmComponent,
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
		LocalDocHtmlEditorDialogComponent,
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

		EmailConfirmComponent,
		TextInputComponent,
		PasswordsInputComponent,

		LogDialogComponent,
		LogSnackComponent,

		NotificationsComponent,
		DataComponentDialog,

		DateRangePickerComponent,
		DateHourRangePickerComponent,

		//ItemListDialogComponent,
		LocalDocHtmlEditorDialogComponent,
		LocalTextEditorDialogComponent,
	],
	providers: [
		//{
		//	provide: MY_DIALOG_OPTIONS, useValue: { useIcon: false }
		//},

		NotificationsComponent,
		NotificationsService,
		TextInputService,
		PasswordsInputService,
		TimeService,

		AlertService,
		LocalAlertService,
		WaitService,
		WaitProgressService,
		ConfirmService,
		OptionsService,
		EmailConfirmService,

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

		LocalDocEditorDialogService,
		LocalTextEditorDialogService,
		OptionListDialogService,
	],

})
export class UI_ServicesModule { }
