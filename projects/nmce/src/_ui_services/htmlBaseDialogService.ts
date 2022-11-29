import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogSize, DialogSizeToSize } from './types';

/**
 * Common behaviors of HTML content dialogs.
 * useBackButton determine whether to use a Back button on the top left cornor of the dialog, or a Close button at the bottom of the dialog.
 * If useBackButton is undefined, when size is Large or current screen is small screen, useBackButton is always true.
 */
export class HtmlBaseDialogService<T> {
	constructor(protected dialog: MatDialog) { }

	modalRef: MatDialogRef<T>;

	/**
	 * Display ComponentType<T> in dialog.
	 * @param data title, size, useBackButton. For small screen, useBackButton is regarded always as true.
	 */
	protected displayComponent(component: ComponentType<T>, data: { title?: string, size?: DialogSize, useBackButton?: boolean }): Observable<any> {
		const isSmallScreen = window.innerWidth < 800 || window.innerHeight < 800;

		if (data.useBackButton == null) {
			if (data.size === DialogSize.Large) {
				data.useBackButton = true;
			} else {
				data.useBackButton = isSmallScreen;
			}
		}

		this.modalRef = this.dialog.open(component, {
			disableClose: true,
			minWidth: DialogSizeToSize(data.size, data.useBackButton, 'vw'),
			minHeight: DialogSizeToSize(data.size, data.useBackButton, 'vh'),
			panelClass: (data.size === DialogSize.Large) ? 'dialog-full-content-height' : undefined,
			data: data,
		});

		return this.modalRef.afterClosed();
	}
}

