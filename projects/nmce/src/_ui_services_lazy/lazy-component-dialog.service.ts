import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataComponentDialogService } from '../_ui_services/dataComponentDialog.component';

/**
 * Simple inheritance from DataComponentDialogService, Show a component in a dialog, for component defined in a lazy module. 
 * And this service should be provided in the lazy module.
 */
@Injectable()
export class LazyComponentDialogService extends DataComponentDialogService {
	constructor(dialog: MatDialog) {
		super(dialog);
	}
}
