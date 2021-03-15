import { Location } from '@angular/common';
import {
	Component,
	ComponentFactoryResolver, ElementRef, Inject, Injectable,
	Type, ViewChild
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HtmlFunc } from '../_func/htmlFunc';
import { DataComponent } from '../_types/DataComponent';
import { LazyDataComponentDialog } from '../_ui_services_lazy/lazy-component-dialog.service';

/**
 * This is to host another component which has implemented interface DataComponent. And another component is to be displayed in a dialog but not need to answer but to close.
 * The Close button may vary depending on the screen size.
 */
@Component({
	templateUrl: 'dataComponentPrintDialog.component.html',
})
export class DataComponentPrintDialog extends LazyDataComponentDialog {
	@ViewChild('htmlPrintContent', { static: false }) htmlContentElement: ElementRef;


	constructor(@Inject(MAT_DIALOG_DATA) protected dialogData: { title: string, externalComponentType: Type<DataComponent>, componentData: any, isSmallScreen: boolean, fullScreen: boolean },
		public dialogRef: MatDialogRef<LazyDataComponentDialog>, protected componentFactoryResolver: ComponentFactoryResolver, private location: Location) {
		super(dialogData, dialogRef, componentFactoryResolver);
	}

	print() {
		HtmlFunc.printWithCSS(this.htmlContentElement.nativeElement.innerHTML, this.location.prepareExternalUrl(''));
	}

}

/**
 * Display an NG component in a dialog, and this dialog has not need to answer but close. For a component defined in a lazy module, use LazyComponentDialogService.
 */
@Injectable()
export class DataComponentPrintDialogService {
	modalRef: MatDialogRef<DataComponentPrintDialog>;

	constructor(private dialog: MatDialog) { }

	open(title: string, externalComponentType: Type<DataComponent>, componentData: any, config?: { autofocus?: boolean, fullScreen?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 640 || window.innerHeight < 640;
		this.modalRef = this.dialog.open(DataComponentPrintDialog,
			{
				disableClose: true,
				minWidth: (config && config.fullScreen) ? '98vw' : (isSmallScreen ? '98vw' : undefined),
				minHeight: (config && config.fullScreen) ? '98vh' : undefined,
				autoFocus: config && config.autofocus,
				data: {
					title: title,
					externalComponentType: externalComponentType,
					componentData: componentData,
					isSmallScreen: isSmallScreen,
					fullScreen: config && config.fullScreen
				}
			});

		return this.modalRef.afterClosed();

	}

}
