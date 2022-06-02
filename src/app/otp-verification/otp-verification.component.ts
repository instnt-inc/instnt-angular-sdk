import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { firstValueFrom, lastValueFrom, map, Observable, pipe, Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { EventHandlerService } from '../services/event-handler.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  isLoading = false;
  isOtpReceived = false;
  loadingMessage = '';
  errorMessage = 'instnt not instantiated, please start from the beginning';
  instnt?: Instnt;
  phoneVerifyForm: FormGroup;
  phone = new FormControl('',
    [Validators.required, Validators.pattern("(([0-9]{10})|([0-9]{3}-[0-9]{3}-[0-9]{4}))"), Validators.maxLength(20)]);
  otpVerifyForm: FormGroup;
  otpVerify = new FormControl('', Validators.required);

  constructor(
    public instntService: InstntAngularService,
    public handler: EventHandlerService,
    private router: Router,
    private dataService: DataService) {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      this.errorMessage = '';
    });
    this.phoneVerifyForm = new FormGroup({
      phone: this.phone,
    });
    this.otpVerifyForm = new FormGroup({
      otpVerify: this.otpVerify
    })
  }

  ngOnInit(): void {
  }

  onSendOTP() {
    this.loadingMessage = 'Sending Code, Please Wait';
    this.isLoading = true
    const phone = '+1' + this.phoneVerifyForm.get('phone')?.value;
    this.instnt?.sendOTP(phone);
    const promise = firstValueFrom(this.handler.OTPSent);
    promise.then((data) => {
      this.isLoading = false;
      this.isOtpReceived = true;
    }).catch((err) => {
      console.error(err.message);
      this.errorMessage = err.message;
    }).finally(() => {
      this.isLoading = false;
    })

  }

  isLoadingOrNot() {
    return this.isLoading
  }

  onSubmitOTP() {
    this.loadingMessage = 'Verifying Code, Please Wait';
    this.isLoading = true
    const phone = '+1' + this.phoneVerifyForm.get('phone')?.value;
    this.dataService.setMobileNumber(phone);
    if (this.instnt?.otpVerification) {
      const otpCode = this.otpVerifyForm.get('otpVerify')?.value.toString();
      this.instnt?.verifyOTP(phone, otpCode);
      firstValueFrom(this.handler.OTPVerified).then((data) => {
        this.isLoading = false,
        this.router.navigate(['doc-upload']);
      }).catch((err) => {
        console.error('error verifying OTP');
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err.message;
    });
    } else {
      this.isLoading = false,
      this.router.navigate(['doc-upload']);
    }

  }

}
