import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DataComponentPrintDialogService } from '../_ui_services_lazy/dataComponentPrintDialog.component';

/**
 * Show a component in a dialog, for component defined in a lazy module. And this service should be provided in the lazy module.
 */
@Injectable({ providedIn: 'root' })
export class LazyComponentPrintDialogService extends DataComponentPrintDialogService {
	constructor(dialog: MatDialog) {
		super(dialog);
	}
}
