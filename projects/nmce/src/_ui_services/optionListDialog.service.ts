import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ItemListDialogServiceBase } from './itemListDialog.component';

/**
 * Show a list of string object item in dialog, and select one.
 */
@Injectable()
export class OptionListDialogService extends ItemListDialogServiceBase {
	constructor(protected dialog: MatDialog) {
		super(dialog);
	}

	toString(item: string) {
		return item;
	}
}
