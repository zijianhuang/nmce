import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';

/**
 * To temporarily present a component not yet being developed however currently workflow need to show something.
 */
@Component({
    templateUrl: 'wip.component.html',
    standalone: true,
})
export class WIPComponent implements OnInit {

	constructor( @Inject(Location) private location: Location) {
		console.debug('WIPComponent created');
	}

	ngOnInit() {
	}

	back() {
		this.location.back();
	}

}
