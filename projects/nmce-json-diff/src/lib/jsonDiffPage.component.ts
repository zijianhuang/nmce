import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyComponentDialogService, DataComponent } from 'nmce';
import { diff } from 'jsondiffpatch';
import * as htmlFormatter from 'jsondiffpatch/lib/formatters/html';

@Component({
	selector: 'json-diff-page',
	templateUrl: 'jsonDiffPage.component.html',
})
export class JsonDiffComponent implements DataComponent, OnInit, AfterViewInit {
	data: any;

	@ViewChild('jsonPlace', { static: false }) jsonPlace: ElementRef;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		const delta = diff(this.data.json1, this.data.json2);
		if (delta) {
			console.debug('delta: ' + JSON.stringify(delta));
			this.jsonPlace.nativeElement.innerHTML = htmlFormatter.format(delta, this.data.json1);
		}
	}
}

@Injectable()
export class JsonDiffDialogService {
	constructor(private dialog: LazyComponentDialogService) { }

	open(title: string, data: { json1: any, json2: any }): Observable<any> {
		return this.dialog.open(title, JsonDiffComponent, data);
	}

}
