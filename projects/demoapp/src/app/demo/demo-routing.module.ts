import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DialogsComponent } from './dialogs.component';
import { HtmlDialogsComponent } from './htmlDialogs.component';
import { DemoIndexComponent } from './demo-index.component';
import { InputDialogsComponent } from './inputDialogs.component';
import { ComponentsComponent} from './components.component';

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
