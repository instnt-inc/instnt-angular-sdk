import { Component, OnInit } from '@angular/core';
import { DecisionResponseModel, Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
  isRetrySubmit = true;
  constructor(private instntService: InstntAngularService, public data: DataService, private events: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      console.log('instnt', instnt);

    });
  }

  ngOnInit(): void {
    firstValueFrom(this.events.SubmitResult).then((res) => {
      this.isRetrySubmit = false;
      this.isLoading = false;
      console.log('Transaction proccessed Response', res);
      this.response = res.data;
    }).catch((err) => {
      console.error('Error Processing Transactions', err);
      if (this.isRetrySubmit) {
        console.log('error Occured, retrying');
      } else {
        this.isLoading = false;
        this.errorMessage = err;
        this.response = err.data;
      }
    }).finally(() => {
    });
  }

  submitApplication() {
    console.log('submiting application', this.instnt);
    this.isLoading = true;
    this.isSubmited = true;
    this.instnt?.submitData(this.data.userData, false);
    setTimeout(() => {
      if (this.isRetrySubmit) {
        console.warn('lambda may have timeout, retrying call');
        this.instnt?.submitData(this.data.userData, false);
        this.isRetrySubmit = false;
      } else {
        console.log('Submission succeeded, no need to try again');
      }
    }, 35000);

  }

}
