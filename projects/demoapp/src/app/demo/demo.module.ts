import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NmceComponentsModule, Nmce_UI_Lazy_ServicesModule } from 'nmce';
import { NmceHtmlEditorModule } from 'nmce-html-editor';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoInputDialogService } from './demoInput.dialog';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NmceComponentsModule,
		DemoRoutingModule,
		Nmce_UI_Lazy_ServicesModule,
		NmceComponentsModule,
		NmceHtmlEditorModule,
	],
	declarations: [

	],
	providers: [
		DemoInputDialogService,
	]
})
export class DemoModule { }
