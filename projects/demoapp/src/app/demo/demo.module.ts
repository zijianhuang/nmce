import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import { DirectivesModule, AppPipesModule, UI_Lazy_ServicesModule } from 'nmce';
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

		AppPipesModule,
		DirectivesModule,
		DemoRoutingModule,
		UI_Lazy_ServicesModule,
	],
	declarations: [
		DemoIndexComponent,
		DialogsComponent,
		HtmlDialogsComponent,
		InputDialogsComponent,
	],
	providers: [

	]
})
export class DemoModule { }
