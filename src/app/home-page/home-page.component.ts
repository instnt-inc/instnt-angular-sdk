import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../services/data.service';
import { EventHandlerService } from '../services/event-handler.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {

  @ViewChild('innerDivElement') innerDivElement: any;
  isLoading = false;
  isInstntInitiated = false;
  onEvent: any;
  children?: any;
  hideFormFields?: boolean = true;
  redirect?: boolean = false;
  errorMsg = '';

  constructor(public data: DataService, private handler: EventHandlerService, private router: Router) { }
  ngOnInit(): void {
    this.onEvent = this.handler.eventHandler;
  }

  onGetStarted() {
    this.errorMsg = '';
    this.isLoading = true;
    this.isInstntInitiated = true;
    firstValueFrom(this.handler.transactionInit).then((instntRef) => {
      this.isLoading = false;
      console.log('Init Success', instntRef);
      this.router.navigate(['/sign-up'])
    });
    setTimeout(() => {
      if (this.isLoading) {
        this.errorMsg = `There seems to have been an error while initiating Instnt, 
      please verify your workflow ID and Service URL is correct then check your browser console logs for errors.`
        this.isLoading = false;
      }
    }, 5000);
  }

}
