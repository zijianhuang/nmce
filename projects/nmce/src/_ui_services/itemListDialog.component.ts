import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';

/**
 * Display a list of items to select one.
 * This will be shown by a concrete service of ItemListDialogServiceBase<T>.
 */
@Component({
	templateUrl: './itemListDialog.component.html',
})
export class ItemListDialogComponent {
	title: string;

	/**
	 * Must be an array type
	 */
	items: any;

	/*
	 * Point to the actual implementation in the concrete class of ItemListDialogServiceBase<T>.
	 * Item type must be the base type of the array type.
	 */
	toString: (item: any) => string;

	/**
	 *
	 * @param data data.items type should be array. data.toStringCallback is to conver an item in the array into string for displaying.
	 * @param dialogRef
	 */
	constructor(@Inject(MAT_DIALOG_DATA) data: { title: string, items: any, toStringCallback: (item: any) => string }, private dialogRef: MatDialogRef<ItemListDialogComponent>,
	) {
		this.title = data.title;
		this.items = data.items;
		this.toString = data.toStringCallback;
	}

	cancel(): void {
		this.dialogRef.close();
	}

	itemSelectionChange(e: MatSelectionListChange) {
		this.dialogRef.close(e.option.value);
	}
}

/**
 * Show a list of object items and select one. T could be a string type, or any object type that could be presented as a literal description.
 */
export abstract class ItemListDialogServiceBase {
	constructor(protected dialog: MatDialog) { }

	/**
	 * Display a list of options. With OptionsComponent, it will be a list of buttons labeled by the option texts.
	 * @param title
	 * @param items
	 * @returns object item selected.
	 */
	open(title: string, items: { [k: string]: any }[] | string[]): Observable<{ [k: string]: any }> {
		const modalRef = this.dialog.open(ItemListDialogComponent, { disableClose: true, autoFocus: false, data: { title: title, items: items, toStringCallback: this.toString } });
		return modalRef.afterClosed();
	}

	/**
	 * Translate item into a string printed in the dialog.
	 * @param item
	 */
	abstract toString(item: { [k: string]: any } | string): string;

}

