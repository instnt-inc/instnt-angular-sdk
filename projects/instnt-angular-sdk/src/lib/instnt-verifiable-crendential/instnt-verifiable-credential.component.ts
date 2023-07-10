import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { InstntAngularService } from '../instnt-angular.service';
import { Instnt, InvitationResponse } from '../interfaces/instnt.interface';

@Component({
    selector: 'instnt-verifiable-credential',
    template: `
  <div></div>
  `,
    styleUrls: []
})
export class InstntVerifiableCredential implements OnInit, AfterViewInit, OnDestroy {

    @Input() serviceURL: string = '';
    @Input() invitationType: 'issuer' | 'verifier';
    @Input() action?: 'authenticate' | 'signup';

    constructor(private http: HttpClient, private service: InstntAngularService) {
        this.invitationType = 'verifier';
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.service.instnt.pipe(take(1)).subscribe((instnt: Instnt) => {
            if (this.serviceURL) {
                this.http.get(
                    `${this.serviceURL}/ssi/${this.invitationType}/${this.action === 'authenticate' ? 'auth/' : ''}invitation/${instnt.instnttxnid}/`)
                    .subscribe({
                        next:(res: any) => {
                            const response: InvitationResponse = res;
                            this.service.credentialInvitation.next(response);
                            this.service.credentialInvitation.complete()
                        },
                        error: (err) => { console.error(err) }
                    });
            }
        })
    }

    ngOnDestroy(): void {
        this.service.credentialInvitation = new ReplaySubject<InvitationResponse>(1);
    }


}