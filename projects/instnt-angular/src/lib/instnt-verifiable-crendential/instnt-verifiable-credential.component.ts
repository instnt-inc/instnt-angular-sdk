import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { InstntAngularService } from '../instnt-angular.service';
import { Instnt, InvitationResponse } from '../interfaces/instnt.interface';

@Component({
    selector: 'instnt-verifiable-credential',
    template: `
  <div>
    <img src="" alt="">
  </div>
  `,
    styleUrls: []
})
export class InstntVerifiableCredential implements OnInit, AfterViewInit {

    //@Input() formId: string = '';
    @Input() serviceURL: string = '';
    @Input() invitationType: 'issuer' | 'verifier';
    @Input() action?: 'authenticate' | 'signup';

    constructor(private http: HttpClient, private service: InstntAngularService) {
        this.invitationType = 'verifier';
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        this.service.instnt.pipe(first()).subscribe((instnt: Instnt) => {
            if (this.serviceURL) {
                console.log('calling ssi');
                this.http.get(
                    `${this.serviceURL}/ssi/${this.invitationType}/${this.action === 'authenticate' ? 'auth/' : ''}invitation/${instnt.instnttxnid}/`)
                    .subscribe({
                        next:(res: any) => {
                            const response: InvitationResponse = res;
                            console.log('res from get', response);
                            // const invitation: any = await res.json();
                            // console.log('invitation', invitation);
                        },
                        error: (err) => { console.error(err) }
                    });
            }
        })
    }


}