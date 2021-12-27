import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  instnt?: Instnt;
  signUpForm: FormGroup;
  firstName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  lastName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z- ]*$/), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9+.]+@([\w-]+\.)+[\w-]{2,}$/), Validators.maxLength(100)]);

  constructor(private instntService: InstntAngularService, private dataService: DataService, private router: Router) {
    this.instntService.getInstnt().subscribe((instnt) => {this.instnt = instnt; console.log('instnt', instnt)});
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    });

  }

  ngOnInit(): void {
  }

  onSubmitInfo() {
    const data = {
      firstName: this.signUpForm.get('firstName')?.value,
      surName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
    }
    this.dataService.setUserData(data.firstName, data.surName, data.email, '');

    // test code bellow
    const userData = {
      firstName: this.signUpForm.get('firstName')?.value,
      surName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      mobileNumber: '+18454213433',
    }
    this.router.navigate(['otp-verify'])
    console.log('instnt', this.instnt);
  }

}
