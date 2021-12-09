import { Component } from '@angular/core';
import { InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { EventHandlerService } from './services/event-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formId: string = 'v1633477069641729';
  serviceURL: string = 'https://dev-api.instnt.org';
  onEvent: any;
  children?: any;

  constructor(public instntService: InstntAngularService, private handler: EventHandlerService) {
    this.onEvent = this.handler.eventHandler;
   }
  ngOnInit(): void {
    this.instntService.getInstnt().subscribe((instnt) => {
      console.log('success', instnt);
    })
  }
}
