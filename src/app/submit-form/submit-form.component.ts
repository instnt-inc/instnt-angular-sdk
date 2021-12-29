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
  constructor(private instntService: InstntAngularService, public data: DataService, private events: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      console.log('instnt', instnt);

    });
  }

  ngOnInit(): void {
    firstValueFrom(this.events.SubmitResult).then((res) => {
      this.isLoading = false;
      console.log('Transaction proccessed Response', res);
      this.response = res.data;
    }).catch((err) => {
      console.error('Error Processing Transactions', err);
      this.isLoading = false;
      if(err.error) {
        this.errorMessage = err;
      } else {
        this.errorMessage = 'There was an error while processing your transaction, please submit it one more time'
      }
      this.isSubmited = false;
    }).finally(() => {
    });
  }

  submitApplication() {
    console.log('submiting application', this.instnt);
    this.isLoading = true;
    this.isSubmited = true;
    this.instnt?.submitData(this.data.userData, false);

  }

}
