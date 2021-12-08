import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { EventHandlerService } from '../services/event-handler.service';

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

  constructor(private instntService: InstntAngularService, private handler: EventHandlerService) {
    this.instntService.getInstnt().subscribe((instnt) => this.instnt = instnt);
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
  }

}
