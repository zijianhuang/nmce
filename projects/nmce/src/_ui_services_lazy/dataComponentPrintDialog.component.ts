import { CommonModule, Location } from '@angular/common';
import {
	Component,
	ComponentFactoryResolver, ElementRef, Inject, Injectable,
	Type, ViewChild
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AlertService } from '../_ui_services/alert.service';
import { HtmlPrintFunc } from 'nmce-func';
import { Observable } from 'rxjs';
import { DataComponent } from '../_types/DataComponent';
import { DIALOG_ACTIONS_ALIGN } from '../_ui_services/baseTypes';
import { DataComponentDialog } from '../_ui_services/dataComponentDialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * This is to host another component which has implemented interface DataComponent. And another component is to be displayed in a dialog but no need to answer but to close.
 * The Close button may vary depending on the screen size.
 */
@Component({
	templateUrl: 'dataComponentPrintDialog.component.html',
	styleUrls: ['../nmcestyles.css'],
	standalone: true,
	imports: [MatButtonModule, MatDialogModule, CommonModule, MatIconModule,]
})
export class DataComponentPrintDialog extends DataComponentDialog {
	@ViewChild('htmlPrintContent', { static: true }) htmlContentElement: ElementRef;

	constructor(
		@Inject(MAT_DIALOG_DATA) protected dialogData: {
			title: string, externalComponentType: Type<DataComponent>,
			componentData: any,
			isSmallScreen: boolean,
			fullScreen: boolean
		},
		@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end',
		public dialogRef: MatDialogRef<DataComponentDialog>,
		protected componentFactoryResolver: ComponentFactoryResolver,
		private location: Location,
		@Inject('print.cssUrl') private cssUrl: string,
		private alertService: AlertService,
	) {
		super(dialogData, actionsAlign, dialogRef, componentFactoryResolver);
	}

	print() {
		HtmlPrintFunc.printWithCSS(this.htmlContentElement.nativeElement.innerHTML, this.location.prepareExternalUrl(this.cssUrl));
	}

	copyToClipboard() {
		const htmlText = this.htmlContentElement.nativeElement.innerHTML;
		const clipboardItem = new ClipboardItem({ //thanks to https://www.nikouusitalo.com/blog/why-isnt-clipboard-write-copying-my-richtext-html/
			'text/plain': new Blob(
				[htmlText],
				{ type: 'text/plain' }
			),
			'text/html': new Blob(
				[htmlText],
				{ type: 'text/html' }
			),
		});

		navigator.clipboard.write([clipboardItem]).then(
			() => {
				this.alertService.success($localize`Copied to clipboard`);
			},
			() => {
				this.alertService.warn($localize`Something wrong`);
			}
		);
	}
}

/**
 * Display an NG component in a dialog, and this dialog has not need to answer but close. For a component defined in a lazy module, use LazyComponentDialogService.
 */
@Injectable({ providedIn: 'root' })
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
