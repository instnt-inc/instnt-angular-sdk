import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecisionResponseModel, Instnt, InstntAngularService, InvitationResponse } from 'projects/instnt-angular/src/public-api';
import { firstValueFrom, lastValueFrom, ReplaySubject } from 'rxjs';
import { DataService } from '../services/data.service';
import { EventHandlerService } from '../services/event-handler.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit, OnDestroy {

  errorMessage = '';
  response?: DecisionResponseModel;
  isLoading = false;
  isServerError = false;
  instnt?: Instnt;
  isSubmited = false;
  invitation?: InvitationResponse;
  constructor(private instntService: InstntAngularService, public data: DataService, private events: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
    });
    console.log('subscribing to getCredentialInvitation');
    this.instntService.getCredentialInvitation().subscribe((invitation) => this.invitation = invitation);
  }

  ngOnInit(): void {
    this.setObservable();
  }

  setObservable() {
    lastValueFrom(this.events.SubmitResult).then((res) => {
      this.isServerError = false;
      this.isLoading = false;
      this.response = res.event_data;
    }).catch((err) => {
      console.error('Error Processing Transactions', err);
      this.isLoading = false;
      if (err.error) {
        this.errorMessage = err;
      } else {
        this.errorMessage = 'There was an error while processing your transaction, please try again'
        this.isServerError = true;
      }
      this.isSubmited = false;
    });
  }

  submitApplication() {
    this.errorMessage = '';
    this.isLoading = true;
    this.isSubmited = true;
    if (this.isServerError) {
      this.events.SubmitResult.unsubscribe();
      this.events.SubmitResult = new ReplaySubject(1);
      this.setObservable();
      this.instnt?.submitSignupData(this.data.userData);
    } else {
      this.instnt?.submitSignupData(this.data.userData);
    }

  }

  ngOnDestroy(): void {
    this.events.SubmitResult.unsubscribe();
    this.events.SubmitResult = new ReplaySubject(1);
  }

}
