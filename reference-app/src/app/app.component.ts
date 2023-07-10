import { Component } from '@angular/core';
import { InstntAngularService } from '@instnt/instnt-angular-sdk';
import { EventHandlerService } from './services/event-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formKey: string = 'v1683136956836059';
  serviceURL: string = 'https://sandbox-api.instnt.org';
  onEvent: any;
  children?: any;

  constructor(public instntService: InstntAngularService, private handler: EventHandlerService) {
    this.onEvent = this.handler.eventHandler;
   }
  ngOnInit(): void {
    this.instntService.getInstnt().subscribe((instnt) => {
    })
  }
}
