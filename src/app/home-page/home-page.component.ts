import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InstntAngularService } from 'instnt-angular';
import { Instnt, InstntSignupProviderProps } from 'projects/instnt-angular/src/public-api';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild('innerDivElement') innerDivElement: any;
  signupProps: InstntSignupProviderProps = {
    form_key: 'v163836889723855',
    serviceURL: 'https://sandbox-api.instnt.org',
    onEvent: (data:any) => {console.log('onEvent called', data)},
    sandbox: false,
    children: [],
  }

  constructor(public instntService: InstntAngularService) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const jQueryFragment = document.createRange().createContextualFragment('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
    this.innerDivElement.nativeElement.appendChild(jQueryFragment);
    (window as any).onInstntEvent = this.signupProps.onEvent;
    this.instntService.instntInit(this.signupProps).subscribe((res: any) => {
      console.log('inside subscribe', res);
      const jQueryFragment = res.html;
      const fragment = document.createRange().createContextualFragment(jQueryFragment);
      this.innerDivElement.nativeElement.appendChild(fragment);
      console.log('window.instnt', (window as any).instnt);
      const instnt: Instnt = (window as any).instnt;
    })

  }

}
