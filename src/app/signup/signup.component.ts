import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';

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
  phone = new FormControl('', [Validators.required, Validators.pattern("(([0-9]{10})|([0-9]{3}-[0-9]{3}-[0-9]{4}))"), Validators.maxLength(20)]);
  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9+.]+@([\w-]+\.)+[\w-]{2,}$/), Validators.maxLength(100)]);

  constructor(private instntService: InstntAngularService) {
    this.instntService.getInstnt().subscribe((instnt) => this.instnt = instnt);
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
    });

  }

  ngOnInit(): void {
    this.instnt?.submitData({}, true)
  }

}
