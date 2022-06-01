import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Instnt } from '../interfaces/instnt.interface';
import { InstntAngularService } from '../instnt-angular.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'instnt-signup-provider',
  template: `
    <div id="instnt-form-generator" #innerDivElement></div>
  `,
  styles: [
  ]
})
export class InstntSignupProviderComponent implements OnInit, AfterViewInit {

  @Input() formId: string = '';
  @Input() serviceURL: string = '';
  @Input() onEvent: any;
  @Input() children?: any;
  @Input() hideFormFields?: boolean = true;
  @Input() redirect?: boolean = false;
  @Input() isAsync?: boolean = false;
  @ViewChild('innerDivElement') innerDivElement: ElementRef = new ElementRef(null);
  readonly idmetrics_version = '4.5.12'

  constructor(private http: HttpClient, private service: InstntAngularService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    (window as any).onInstntEvent = this.onEvent;
    (window as any).instntSettings = {
      isAsync: this.isAsync,
      onEvent: this.onEvent,
    };
    // Load the jquery library from google ajax first.
    const jQueryFragment = document.createRange().createContextualFragment('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
    this.innerDivElement.nativeElement.appendChild(jQueryFragment);
    const payload = {
      form_key: this.formId,
      hide_form_fields: this.hideFormFields,
      redirect: this.redirect,
    }
    if (this.serviceURL) {
      this.http.post(this.serviceURL + `/public/transactions?idmetrics_version=${this.idmetrics_version}`, payload).subscribe({
        next: (res: any) => {
          const jQueryFragment = res.html;
          const fragment = document.createRange().createContextualFragment(jQueryFragment);
          this.innerDivElement.nativeElement.appendChild(fragment);
          this.service.instnt.next((window as any).instnt)
        },
        error: (err) => { console.error(err)}
      });
    }
  }

}
