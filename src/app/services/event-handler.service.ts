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
  OTPSent: ReplaySubject<any> = new ReplaySubject(1);
  OTPVerified: ReplaySubject<any> = new ReplaySubject(1);
  DocumentCaptured: ReplaySubject<any> = new ReplaySubject(1);
  SubmitResult: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.eventHandler = (event: InstntEvent) => {
      this.testInstnt = event
      console.log('event handler service', event);
      let eventData;
      let eventType;
      event.event_data ? eventData = event.event_data : eventData = event.data;
      event.event_type ? eventType = event.event_type : eventData = event.type;
      switch (eventType) {
        case EventType.TransactionInitiated:
          const instntRef = eventData.instnt;
          this.transactionInit.next(instntRef);
          this.transactionInit.complete();
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
          this.OTPSent.error(eventData);
          this.OTPVerified.error(eventData);
          break;
        case EventType.DocumentCaptured:
          console.log('event type document.captured triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case EventType.DocumentCaptureCancelled:
          console.log('event type documentCapture Canceled triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case EventType.TransactionProcessed:
          console.log('event type Transaction Proccessed', event);
          this.SubmitResult.next(event);
          this.SubmitResult.complete();
          break;
        case EventType.TransactionError:
          console.log('event type Transaction Error', event);
          this.SubmitResult.error(event);
          this.SubmitResult.complete();
          console.log('should have submited error and then complete')
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
