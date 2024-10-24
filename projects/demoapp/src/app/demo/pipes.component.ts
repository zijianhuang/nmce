import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';


@Component({
	templateUrl: 'pipes.component.html',
})
export class PipesComponent implements OnInit {
	currentDateTime: Date;
	yesterday: Date;
	tomorrow: Date;
	future: Date;
	amount=12345.67;
	amountInCent=987199;
	constructor(
		
	) {
		this.currentDateTime = new Date();
		this.yesterday= DateTime.fromJSDate(this.currentDateTime).plus({days: -1}).toJSDate();
		this.tomorrow= DateTime.fromJSDate(this.currentDateTime).plus({days: 1}).toJSDate();
		this.future= DateTime.fromJSDate(this.currentDateTime).plus({days: 10}).toJSDate();
	}

	ngOnInit() {
	}

}


