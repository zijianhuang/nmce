import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { DIALOG_ACTIONS_ALIGN } from './baseTypes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

/**
 * Display a list of items to select one.
 * This will be shown by a concrete service of ItemListDialogServiceBase<T>.
 */
@Component({
    templateUrl: './itemListDialog.component.html',
    styleUrls: ['../nmcestyles.css'],
    standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatListModule]
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
	constructor(@Inject(MAT_DIALOG_DATA) data: { title: string, items: any, toStringCallback: (item: any) => string }, 
	@Inject(DIALOG_ACTIONS_ALIGN) public actionsAlign: 'start' | 'center' | 'end', 
	private dialogRef: MatDialogRef<ItemListDialogComponent>,
	) {
		this.title = data.title;
		this.items = data.items;
		this.toString = data.toStringCallback;
	}

	/**
	 * the observable returned is empty string "".
	 */
	cancel(): void {
		this.dialogRef.close();
	}

	itemSelectionChange(e: MatSelectionListChange) {
		this.dialogRef.close(e.options[0].value);
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
	open(title: string, items: { [k: string]: any }[] | string[]): Observable<{ [k: string]: any } | string> {
		const modalRef = this.dialog.open(ItemListDialogComponent, { disableClose: true, autoFocus: false, data: { title: title, items: items, toStringCallback: this.toString } });
		return modalRef.afterClosed();
	}

	/**
	 * Translate item into a string printed in the dialog.
	 * @param item
	 */
	abstract toString(item: { [k: string]: any } | string): string;

}

