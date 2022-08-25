import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Not found routing defined in app-routing.module will render this page. And the user can go home.
 */
@Component({

	templateUrl: 'notFound.component.html'
})
export class NotFoundComponent implements OnInit {

	constructor(@Inject('NotFoundRoutingMessage') public message: string, private router: Router) {
		console.debug('NotFoundComponent created');
	}

	ngOnInit() {
	}

	home() {
			this.router.navigate(['/']);
	}

}
