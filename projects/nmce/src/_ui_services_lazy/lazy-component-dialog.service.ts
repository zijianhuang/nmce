import { Component, ComponentFactoryResolver, Inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataComponent } from '../_types/DataComponent';
import { DataComponentDialog, DataComponentDialogService } from '../_ui_services/dataComponentDialog.component';

@Component({
	templateUrl: '../_ui_services/dataComponentDialog.component.html',
})
export class LazyDataComponentDialog extends DataComponentDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) protected dialogData: {
			title: string, externalComponentType: Type<DataComponent>,
			componentData: any,
			isSmallScreen: boolean,
			fullScreen: boolean
		},
		public dialogRef: MatDialogRef<LazyDataComponentDialog>,
		protected componentFactoryResolver: ComponentFactoryResolver
	) {
		super(dialogData, dialogRef, componentFactoryResolver);
	}

}

/**
 * Show a component in a dialog, for component defined in a lazy module. And this service should be provided in the lazy module.
 */
@Injectable()
export class LazyComponentDialogService extends DataComponentDialogService {
	constructor(dialog: MatDialog) {
		super(dialog);
	}
}
