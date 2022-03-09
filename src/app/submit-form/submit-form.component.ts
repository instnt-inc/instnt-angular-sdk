import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecisionResponseModel, Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
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
  instnt?: Instnt;
  isSubmited = false;
  constructor(private instntService: InstntAngularService, public data: DataService, private events: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      console.log('instnt', instnt);
      
    });
  }
  
  ngOnInit(): void {
    lastValueFrom(this.events.SubmitResult).then((res) => {
      console.log('first ValueFrom called')
      this.isLoading = false;
      console.log('Transaction proccessed Response', res);
      this.response = res.data;
    }).catch((err) => {
      console.error('Error Processing Transactions', err);
      this.isLoading = false;
      if (err.error) {
        this.errorMessage = err;
      } else {
        this.errorMessage = 'There was an error while processing your transaction, please try again'
      }
      this.isSubmited = false;
    });
  }

  submitApplication() {
    this.errorMessage = '';
    this.isLoading = true;
    this.isSubmited = true;
    this.instnt?.submitData(this.data.userData, false);

  }

  ngOnDestroy(): void {
    this.events.SubmitResult.unsubscribe();
    this.events.SubmitResult = new ReplaySubject(1);
  }

}
