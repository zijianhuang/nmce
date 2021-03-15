import { Component } from '@angular/core';
import { AlertService } from '../../../../dist/nmce';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoapp';

  constructor(private alertService: AlertService){
    this.alertService.initOnce();
  }
}
