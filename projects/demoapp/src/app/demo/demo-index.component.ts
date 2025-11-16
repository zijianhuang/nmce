import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs'
@Component({
    selector: 'demo-index',
    templateUrl: 'demo-index.component.html',
    standalone: true,
	imports: [RouterModule, MatTabsModule]
})
export class DemoIndexComponent implements OnInit {
	constructor(private titleService: Title,
		private router: Router
	) {

	}
	ngOnInit(): void {
		this.titleService.setTitle('Demo OK');
		console.debug('current route: ' + this.router.url);
	}

	get defaultActive(): boolean {
		return this.router.url === '/demo';
	}
}
