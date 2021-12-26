import { Component, OnInit } from '@angular/core';
import moment from 'moment';

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
		this.yesterday= moment(this.currentDateTime).add(-1, 'day').toDate();
		this.tomorrow= moment(this.currentDateTime).add(1, 'day').toDate();
		this.future= moment(this.currentDateTime).add(10, 'day').toDate();
	}

	ngOnInit() {
	}

}


