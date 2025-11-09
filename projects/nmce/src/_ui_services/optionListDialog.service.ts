import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemListDialogServiceBase } from './itemListDialog.component';

/**
 * Show a list of string object item in dialog, and select one.
 */
@Injectable({ providedIn: 'root' })
export class OptionListDialogService extends ItemListDialogServiceBase {
	constructor(protected dialog: MatDialog) {
		super(dialog);
	}

	toString(item: string) {
		return item;
	}
}
