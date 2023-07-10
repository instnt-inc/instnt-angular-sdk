import { Injectable } from '@angular/core';
import { Instnt, InstntEvent } from '@instnt/instnt-angular-sdk';
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
      event.event_type ? eventType = event.event_type : eventType = event.type;
      switch (eventType) {
        case 'transaction.initiated':
          const instntRef = eventData.instnt;
          this.transactionInit.next(instntRef);
          this.transactionInit.complete();
          break;
        case 'otp.sent':
          console.log('event type otp sent', event.type);
          this.OTPSent.next(eventData);
          break;
        case 'otp.verified':
          this.OTPVerified.next(eventData);
          break;
        case 'otp.error':
          console.log('event type otp.error triggered', event);
          this.OTPSent.error(eventData);
          this.OTPVerified.error(eventData);
          break;
        case 'document.captured':
          console.log('event type document.captured triggered', event);
          this.DocumentCaptured.next(event);
          break;
        case 'document.capture-cancelled':
          console.log('event type documentCapture Canceled triggered', event);
          this.DocumentCaptured.next(event);
          break;
          case 'transaction.submitted':
          console.log('event type Transaction Submitted', event);
          this.SubmitResult.next(event);
          break;
          case 'transaction.accepted':
          console.log('event type Transaction Proccessed', event);
          this.SubmitResult.next(event);
          this.SubmitResult.complete();
          break;
          case 'transaction.review':
          console.log('event type Transaction Proccessed', event);
          this.SubmitResult.next(event);
          this.SubmitResult.complete();
          break;
        case 'transaction.rejected':
          console.log('event type Transaction Proccessed', event);
          this.SubmitResult.next(event);
          this.SubmitResult.complete();
          break;
        case 'transaction.error':
          console.log('event type Transaction Error', event);
          this.SubmitResult.error(event);
          this.SubmitResult.complete();
          console.log('should have submited error and then complete')
          break;
        default:
          console.log("unhandled instnt event ", event);
          //this.OTPVerified.complete();
      }

    }
  }

  testSubscribe() {
    // setTimeout(() => {
    //   this.OTPSent.next(this.testInstnt);
    // }, 2000);
  }
}
