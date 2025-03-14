import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * todo: move this to pattern page. Not found routing defined in app-routing.module which will render this page. And the user can go home.
 */
@Component({
    //no need to have selector
    templateUrl: 'notFound.component.html',
    standalone: false
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
