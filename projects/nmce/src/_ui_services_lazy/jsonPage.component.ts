// import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
// import { Observable } from 'rxjs';
// import { DataComponent } from '../_types/DataComponent';
// import { LazyComponentDialogService } from '../_ui_services_lazy/lazy-component-dialog.service';
// import JSONFormatter from 'json-formatter-js';

// @Component({
// 	selector: 'json-page',
// 	templateUrl: 'jsonPage.component.html',
// })
// export class JsonComponent implements DataComponent, OnInit, AfterViewInit { later do it with Material tree
// 	data: any;

// 	@ViewChild('jsonPlace', { static: false }) jsonPlace: ElementRef;

// 	constructor() { }

// 	ngOnInit() {
// 	}

// 	ngAfterViewInit() {
// 		const formatter = new JSONFormatter(this.data);
// 		this.jsonPlace.nativeElement.appendChild(formatter.render());
// 	}

// }


// @Injectable()
// export class JsonDialogService {
// 	constructor(private dialog: LazyComponentDialogService) { }

// 	open(title: string, data: any): Observable<any> {
// 		return this.dialog.open(title, JsonComponent, data);
// 	}

// }
