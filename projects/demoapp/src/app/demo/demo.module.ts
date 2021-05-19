import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NmceComponentsModule, Nmce_UI_Lazy_ServicesModule } from 'nmce';
import { NmceDirectivesModule } from 'nmce-directives';
import { NmceHtmlEditorModule } from 'nmce-html-editor';
import { NmceJsonDiffModule } from 'nmce-json-diff';
import { NmcePipesModule } from 'nmce-pipes';
import { NGMDModule } from '../ngmd.module';
import { ComponentsComponent } from './components.component';
import { DemoIndexComponent } from './demo-index.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DialogsComponent } from './dialogs.component';
import { HtmlDialogsComponent } from './htmlDialogs.component';
import { InputDialogsComponent } from './inputDialogs.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,
		FlexLayoutModule,

		NmceComponentsModule,
		NmcePipesModule,
		NmceDirectivesModule,
		DemoRoutingModule,
		Nmce_UI_Lazy_ServicesModule,
		NmceComponentsModule,
		NmceHtmlEditorModule,
		NmceJsonDiffModule,
	],
	declarations: [
		DemoIndexComponent,
		DialogsComponent,
		HtmlDialogsComponent,
		InputDialogsComponent,
		ComponentsComponent,
	],
	providers: [

	]
})
export class DemoModule { }
