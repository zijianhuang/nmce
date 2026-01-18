import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from './confirm.component';

/**
 * Provide ConfirmComponent dialog for confirmation Yes or No. disableClose=true.
 */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
	modalRef: MatDialogRef<ConfirmComponent>;

	private _opened = false;
	/**
	 * Tell client codes if the dialog is opened.
	 */
	get opened() {
		return this._opened;
	}
	set opened(v: boolean) {
		this._opened = v;
	}

	constructor(private dialog: MatDialog) { }

	open(title: string, body: string, action = $localize`Yes`, cancel = $localize`No`): Observable<boolean> {
		this.modalRef = this.dialog.open(ConfirmComponent, {
			data: {
				title: title,
				body: body,
				action: action,
				cancel: cancel
			}
		});

		this.opened = true;
		const c = this.modalRef.afterClosed();
		c.subscribe(() => this.opened = false);
		return c;
	}


	/**
	 * With default "Are you sure?" body.
	 */
	openDefault(): Observable<boolean> {
		return this.open($localize`Confirm`, $localize`Are you sure?`);
	}

	closeIfOpened() {
		if (this.opened) {
			this.modalRef.close();
		}
	}
}
