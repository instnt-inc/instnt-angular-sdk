import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Instnt, InstntAngularService, InvitationResponse } from '@instnt/instnt-angular-sdk';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  instnt?: Instnt;
  invitation?: InvitationResponse;
  errorMessage = 'instnt not instantiated, please start from the beginning';

  signUpForm: FormGroup;
  firstName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  lastName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9+.]+@([\w-]+\.)+[\w-]{2,}$/), Validators.maxLength(100)]);
  physicalAddress = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S+(?:\s+\S+)+/), Validators.maxLength(50)]);
  city = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  state = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  zip = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/), Validators.maxLength(50)]);

  constructor(
    public dataService: DataService,
    private instntService: InstntAngularService,
    private router: Router) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      this.errorMessage = ''
    });
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      physicalAddress: this.physicalAddress,
      city: this.city,
      state: this.state,
      zip: this.zip,
    });
    this.instntService.getCredentialInvitation().subscribe((invitation) => {
      this.invitation = invitation;
    })
  }

  ngOnInit(): void {
  }

  onSubmitInfo() {
    this.instntService
    const data = {
      firstName: this.signUpForm.get('firstName')?.value,
      surName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      physicalAddress: this.signUpForm.get('physicalAddress')?.value,
      city: this.signUpForm.get('city')?.value,
      state: this.signUpForm.get('state')?.value,
      zip: this.signUpForm.get('zip')?.value,



    }
    this.dataService.setUserData(data.firstName, data.surName, data.email, data.physicalAddress, data.city, data.state, data.zip, '');
    this.router.navigate(['otp-verify']);

    console.log('instnt', this.instnt);
  }

}
