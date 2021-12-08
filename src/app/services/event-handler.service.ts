import { Injectable } from '@angular/core';
import { EventType, Instnt, InstntEvent } from 'projects/instnt-angular/src/public-api';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  eventHandler: any;
  transactionInit: ReplaySubject<Instnt> = new ReplaySubject(1);
  OTPSent: ReplaySubject<any> = new ReplaySubject(1);
  OTPVerified: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.eventHandler = (event: InstntEvent) => {
      console.log('event handler service', event);
      const eventData = event.data;
      switch (event.type) {
        case EventType.TransactionInitiated:
          const instntRef = event.data.instnt;
          this.transactionInit.next(instntRef);
          break;
        case EventType.OTPSent:
          console.log('event type otp sent', event.type);
          this.OTPSent.next(eventData);
          break;
        case EventType.OTPVerified:
          this.OTPVerified.next(eventData);
          break;
        case EventType.OTPError:
          this.OTPVerified.error(event);
          break;
          default:
            console.log("unhandled instnt event ", event);
            this.OTPVerified.complete();
      }
    }
  }
}
