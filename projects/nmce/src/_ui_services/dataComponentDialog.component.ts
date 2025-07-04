import { AfterViewInit, Component, ComponentFactoryResolver, Inject, Injectable, Input, OnDestroy, Type, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataComponentDirective } from 'nmce-directives';
import { Observable } from 'rxjs';
import { DataComponent } from '../_types/DataComponent';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';

/**
 * This is to host another component which has implemented interface DataComponent. 
 * And another component is to be displayed in a dialog but not need to answer but to close.
 * The Close button may vary depending on the screen size.
 * This component is primarily used in DataComponentDialogService.
 * This is based on the concept in https://angular.io/guide/dynamic-component-loader
 */
@Component({
    selector: 'nmce-data-component-content',
    templateUrl: 'dataComponentDialog.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: false
})
export class DataComponentDialog implements AfterViewInit, OnDestroy {
	@Input()
	title: string;

	@Input()
	data: any;

	/**
	 * Reference to dataComponentHost with ng-container
	 */
	@ViewChild(DataComponentDirective, { static: false }) componentHost: DataComponentDirective;

	externalComponentType: Type<DataComponent>;

	fullScreen = false;

	/**
	 * True to have the Close button displayed on the top right corner.
	 */
	isSmallScreen: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) protected dialogData: {
			title: string,
			externalComponentType: Type<DataComponent>,
			componentData: any,
			isSmallScreen: boolean,
			fullScreen: boolean
		},
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
		public dialogRef: MatDialogRef<DataComponentDialog>,
		protected componentFactoryResolver: ComponentFactoryResolver
	) {
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
		const viewContainerRef = this.componentHost.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent(this.externalComponentType); // now ng-container  has the component
		componentRef.instance.data = this.data; //This is currently the way of injecting data to the dynamically created instance
	}

}

/**
 * Display an NG component in a dialog, and this dialog has not need to answer but close. 
 * For a component defined in a lazy module, use LazyComponentDialogService.
 */
@Injectable()
export class DataComponentDialogService {
	modalRef: MatDialogRef<DataComponentDialog>;

	constructor(private dialog: MatDialog) { }

	/**
	 * 
	 * @param title Dialog title
	 * @param externalComponentType 
	 * @param componentData pass data to the instance of externalComponentType
	 * @param config autofocus or fullScreen
	 * @returns anything
	 */
	open(title: string, externalComponentType: Type<DataComponent>, componentData: any, config?: { autofocus?: boolean, fullScreen?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 640 || window.innerHeight < 640;
		this.modalRef = this.dialog.open(DataComponentDialog,
			{
				disableClose: true,
				minWidth: (config && config.fullScreen) ? '98vw' : (isSmallScreen ? '98vw' : undefined),
				minHeight: (config && config.fullScreen) ? '98vh' : undefined,
				panelClass: 'dialog-full-content-height',
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
