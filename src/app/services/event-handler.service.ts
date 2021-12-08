import { Injectable } from '@angular/core';
import { Instnt } from 'projects/instnt-angular/src/public-api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  eventHandler: any;
  transactionInit: Subject<Instnt> = new Subject();
  constructor() { 
    this.eventHandler = (event: any) => {
      console.log('event handled', event);
      switch (event.type) {
        case 'transaction.initiated':
          const instntRef = event.data.instnt;
          this.transactionInit.next(instntRef);
          break;
      
        default:
          console.log("unhandled instnt event ", event);
      }
    }
  }
}
