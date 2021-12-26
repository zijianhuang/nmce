import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'demo-dialog',
    templateUrl: 'demoInput.dialog.html',
  })
  export class DemoInputComponent {
    constructor(
      public dialogRef: MatDialogRef<DemoInputComponent>,
      
    ) {}
  
    close(): void {
      this.dialogRef.close();
    }
  }

@Injectable()
export class DemoInputDialogService {
	constructor(private dialog: MatDialog) { }

	open() {
		const modalRef = this.dialog.open(DemoInputComponent, {
			disableClose: true,
			autoFocus: false,
		});

		return modalRef.afterClosed();
	}

}