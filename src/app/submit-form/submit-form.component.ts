import { Component, OnInit } from '@angular/core';
import { DecisionResponseModel, Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../services/data.service';
import { EventHandlerService } from '../services/event-handler.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {

  errorMessage = '';
  response?: DecisionResponseModel;
  isLoading = false;
  instnt?: Instnt;
  isSubmited = false;
  isLambdaTimeout = true;
  constructor(private instntService: InstntAngularService, public data: DataService, private events: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      console.log('instnt', instnt);

    });
  }

  ngOnInit(): void {
    firstValueFrom(this.events.SubmitResult).then((res) => {
      this.isLambdaTimeout = false;
      this.isLoading = false;
      console.log('Transaction proccessed Response', res);
      this.response = res.data;
    }).catch((err) => {
      console.log('error called')
      console.error('Error Processing Transactions', err);
      console.log('err.error = ', err.error);
      err.error === "" ? this.isLambdaTimeout = true : this.isLambdaTimeout = false;
      console.log('this.isLambdaTimeout: ', this.isLambdaTimeout);
      this.isLoading = false;
      this.errorMessage = err;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  submitApplication() {
    console.log('submiting application', this.instnt);
    this.isLoading = true;
    this.isSubmited = true;
    this.instnt?.submitData(this.data.userData, false);
    setTimeout(() => {
      if(this.isLambdaTimeout) {
        console.warn('lambda may have timeout, retrying call');
        this.instnt?.submitData(this.data.userData, false);
      } else {
        console.log('lambda has not timed-out, this.isLambdaTimeout: ', this.isLambdaTimeout)
      }
    }, 31000);

  }

}
