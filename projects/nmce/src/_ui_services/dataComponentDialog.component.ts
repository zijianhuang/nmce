import { AfterViewInit, Component, Inject, Injectable, Input, OnDestroy, Type, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataComponent } from '../_types/DataComponent';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataComponentDirective } from '../_types/dataComponent.directive';

/**
 * This is to host another component which implements interface DataComponent. 
 * And the other component is to be displayed in a dialog but no need to answer but to close.
 * The Close button may vary depending on the screen size.
 * This component is primarily used in DataComponentDialogService.
 * This is based on the concept in https://angular.io/guide/dynamic-component-loader
 */
@Component({
    selector: 'nmce-data-component-content',
    templateUrl: 'dataComponentDialog.component.html',
    styleUrls: ['../../../components-styles/nmce-styles.css', '../../../components-styles/nmce-colors.css', '../../../components-styles/nmce-flex.css',
		'../../styles/nmce-dialog.css'
	],
    standalone: true,
	imports: [MatButtonModule, MatDialogModule, MatIconModule, DataComponentDirective]
})
export class DataComponentDialog implements AfterViewInit {
	@Input()
	title: string;

	@Input()
	data: any;

	/**
	 * Reference to dataComponentHost with ng-container
	 */
	@ViewChild(DataComponentDirective, { static: true }) componentHost: DataComponentDirective;

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
@Injectable({ providedIn: 'root' })
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
