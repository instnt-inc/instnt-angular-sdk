import { Injectable } from '@angular/core';
import { EventType, Instnt, InstntEvent } from 'projects/instnt-angular/src/public-api';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  testInstnt: any
  eventHandler: any;
  transactionInit: ReplaySubject<Instnt> = new ReplaySubject(1);
  OTPSent: Subject<any> = new Subject();
  OTPVerified: Subject<any> = new Subject();
  DocumentCaptured: Subject<any> = new Subject();
  constructor() {
    this.eventHandler = (event: InstntEvent) => {
      this.testInstnt = event
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
          console.log('event type otp.error triggered', event);
          this.OTPSent.error(event.data);
          this.OTPVerified.error(event.data);
          break;
        case EventType.DocumentCaptured:
          console.log('event type document.captured triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case EventType.DocumentCaptureCancelled:
          console.log('event type documentCapture Canceled triggered', event);
          this.DocumentCaptured.next(event);
          break;
        default:
          console.log("unhandled instnt event ", event);
          this.OTPVerified.complete();
      }

    }
  }

  testSubscribe() {
    // setTimeout(() => {
    //   this.OTPSent.next(this.testInstnt);
    // }, 2000);
  }
}
