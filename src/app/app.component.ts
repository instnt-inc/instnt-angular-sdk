import { Component } from '@angular/core';
import { InstntAngularService } from 'projects/instnt-angular/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formId: string = 'v163836889723855';
  serviceURL: string = 'https://sandbox-api.instnt.org';
  onEvent: any;
  children?: any;

  constructor(public instntService: InstntAngularService) { }
  ngOnInit(): void {
    this.instntService.getInstnt().subscribe((instnt) => {
      console.log('success', instnt);
    })
  }
}
