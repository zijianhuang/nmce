import { Component, Input, Injectable, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, Type, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataComponent } from '../_types/DataComponent';
import { DataComponentDirective } from 'nmce-directives';

/**
 * This is to host another component which has implemented interfact DataComponent. And another component is to be displayed in a dialog but not need to answer but to close.
 * The Close button may vary depending on the screen size.
 */
@Component({
	templateUrl: 'dataComponentDialog.component.html',
})
export class DataComponentDialog implements AfterViewInit, OnDestroy {
	@Input()
	title: string;

	@Input()
	data: any;

	@ViewChild(DataComponentDirective, { static: false }) componentHost: DataComponentDirective;

	externalComponentType: Type<DataComponent>;

	fullScreen = false;

	/**
	 * True to have the Close button displayed on the top right corner.
	 */
	isSmallScreen: boolean;

	constructor(@Inject(MAT_DIALOG_DATA) protected dialogData: { title: string, externalComponentType: Type<DataComponent>, componentData: any, isSmallScreen: boolean, fullScreen: boolean },
		public dialogRef: MatDialogRef<DataComponentDialog>, protected componentFactoryResolver: ComponentFactoryResolver) {
		this.isSmallScreen = dialogData.isSmallScreen;
		this.title = dialogData.title;
		this.externalComponentType = dialogData.externalComponentType;
		this.data = dialogData.componentData;
		this.fullScreen = dialogData.fullScreen;
	}


	ngAfterViewInit() {
		this.loadComponent();
	}

	ngOnDestroy() {
	}

	loadComponent() {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory<DataComponent>(this.externalComponentType);

		const viewContainerRef = this.componentHost.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent(componentFactory);
		componentRef.instance.data = this.data;
	}

}

/**
 * Display an NG component in a dialog, and this dialog has not need to answer but close. For a component defined in a lazy module, use LazyComponentDialogService.
 */
@Injectable()
export class DataComponentDialogService {
	modalRef: MatDialogRef<DataComponentDialog>;

	constructor(private dialog: MatDialog) { }

	open(title: string, externalComponentType: Type<DataComponent>, componentData: any, config?: { autofocus?: boolean, fullScreen?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 640 || window.innerHeight < 640;
		this.modalRef = this.dialog.open(DataComponentDialog,
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
