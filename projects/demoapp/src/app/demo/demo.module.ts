import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { DemoInputComponent, DemoInputDialogService } from './demoInput.dialog';
import { DialogsComponent } from './dialogs.component';
import { DirectivesComponent } from './directives.component';
import { HtmlDialogsComponent } from './htmlDialogs.component';
import { InputDialogsComponent } from './inputDialogs.component';
import { PipesComponent } from './pipes.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,

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
		DirectivesComponent,
		DemoInputComponent,
		PipesComponent,
	],
	providers: [
		DemoInputDialogService,
	]
})
export class DemoModule { }
