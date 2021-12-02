import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {

  @ViewChild('innerDivElement') innerDivElement: any;
  formId: string = 'v163836889723855';
  serviceURL: string = 'https://sandbox-api.instnt.org';
  onEvent: any;
  children?: any;
  hideFormFields?: boolean = true;
  redirect?: boolean = false;

  constructor(public instntService: InstntAngularService) { }
  ngOnInit(): void {
    this.instntService.getInstnt().subscribe((instnt) => {
      console.log('success', instnt);
    })
  }

}
