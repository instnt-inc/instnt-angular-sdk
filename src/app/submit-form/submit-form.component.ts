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
      this.isLoading = false;
      console.log('error called')
      console.error('Error Processing Transactions', err);
      this.errorMessage = err;
    }).finally(() => this.isLoading = false);

    // this.events.SubmitResult.subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     console.log('Next called')
    //     console.log('Transaction proccessed Response', res);
    //     this.response = res.data;
    //   }, error: (err) => {
    //     this.isLoading = false;
    //     console.log('error called')
    //     console.error('Error Processing Transactions', err);
    //     this.errorMessage = err;
    //   }, complete: () => {
    //     console.log('complete called')
    //     this.isLoading = false;
    //   }
    // })
  }

  submitApplication() {
    console.log('submiting application', this.instnt);
    this.isLoading = true;
    this.isSubmited = true;
    this.instnt?.submitData(this.data.userData, false);


    // test data
    // const userData = {
    //   firstName: 'Claudio',
    //   surName: 'Teles',
    //   email: 'telesapps85@gmail.com',
    //   mobileNumber: '+18454213433',
    // }
    // this.instnt?.submitData(userData, false);
  }

}
