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
  @ViewChild('innerDivElement') innerDivElement: ElementRef = new ElementRef(null);

  constructor(private http: HttpClient, private service: InstntAngularService) { }

  ngOnInit(): void {
    console.log('init works', this.formId, this.serviceURL, this.onEvent)
  }

  ngAfterViewInit() {
    (window as any).onInstntEvent = this.onEvent;
    // Load the jquery library from google ajax first.
    const jQueryFragment = document.createRange().createContextualFragment('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
    this.innerDivElement.nativeElement.appendChild(jQueryFragment);
    const payload = {
      form_key: this.formId,
      hide_form_fields: this.hideFormFields,
      redirect: this.redirect,
    }
    if (this.serviceURL) {
      this.http.post(this.serviceURL + '/public/transactions?idmetrics_version=4.5.4', payload).subscribe({
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
