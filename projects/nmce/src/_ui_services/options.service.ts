import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OptionsComponent } from './options.component';

/**
 * Confirmation with multiple options as buttons horizontally.
 */
@Injectable()
export class OptionsService {
	constructor(private dialog: MatDialog) { }

	/**
	 * Display a list of options. With OptionsComponent, it will be a list of buttons labeled by the option texts.
	 * @param title
	 * @param body
	 * @param options
	 * @returns the selected option
	 */
	open(title: string, body: string, options: string[]): Observable<string> {
		const modalRef = this.dialog.open(OptionsComponent, { disableClose: true, data: {title: title, body: body, options: options} });
		return modalRef.afterClosed();
	}

}
