import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { DemoIndexComponent } from './demo-index.component';
import { DialogsComponent } from './dialogs.component';
import { DirectivesComponent } from './directives.component';
import { HtmlDialogsComponent } from './htmlDialogs.component';
import { InputDialogsComponent } from './inputDialogs.component';
import { PipesComponent } from './pipes.component';

const featureRoutes: Routes = [
	{
		path: '',
		component: DemoIndexComponent,
		children: [
			{ path: '', component: InputDialogsComponent },
			{ path: 'dialogs', component: DialogsComponent },
			{ path: 'htmlDialogs', component: HtmlDialogsComponent },
			{ path: 'inputDialogs', component: InputDialogsComponent },
			{ path: 'components', component: ComponentsComponent },
			{ path: 'directives', component: DirectivesComponent },
			{ path: 'pipes', component: PipesComponent },
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(featureRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DemoRoutingModule { }
