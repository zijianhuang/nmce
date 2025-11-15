import { Component, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from 'nmce-directives';

@Component({
    selector: 'demo-dialog',
    templateUrl: 'demoInput.dialog.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, AutofocusDirective]
})
  export class DemoInputComponent {
    constructor(
      public dialogRef: MatDialogRef<DemoInputComponent>,
      
    ) {}
  
    close(): void {
      this.dialogRef.close();
    }
  }

@Injectable({ providedIn: 'root' })
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