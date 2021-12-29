import { Component } from '@angular/core';
import { InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { DataService } from './services/data.service';
import { EventHandlerService } from './services/event-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  constructor() {
   }
  ngOnInit(): void {
    
  }
}
