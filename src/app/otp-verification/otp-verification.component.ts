import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { Subject } from 'rxjs';
import { EventHandlerService } from '../services/event-handler.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  isLoading: Subject<boolean> = new Subject();
  isOtpReceived: Subject<boolean> = new Subject();
  loadingMessage = '';
  errorMessage = '';
  instnt?: Instnt;
  phoneVerifyForm: FormGroup;
  phone = new FormControl('',
    [Validators.required, Validators.pattern("(([0-9]{10})|([0-9]{3}-[0-9]{3}-[0-9]{4}))"), Validators.maxLength(20)]);
  otpVerifyForm: FormGroup;
  otpVerify = new FormControl('', Validators.required);

  constructor(private instntService: InstntAngularService, private handler: EventHandlerService, private ref: ChangeDetectorRef) {
    this.instntService.getInstnt().subscribe((instnt) => this.instnt = instnt);
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
    this.isLoading.next(true);
    const phone = '+1' + this.phoneVerifyForm.get('phone')?.value;
    this.instnt?.sendOTP(phone);
    this.handler.OTPSent.subscribe({
      next: (data) => {
        console.log('OTP Sent inside subscribe', data);
        this.isLoading.next(false);
        this.isOtpReceived.next(true);
        console.log('this.isLoading = ', this.isLoading)
        this.ref.detectChanges();
        this.ref.reattach();
      }, error: (error) => {
        console.error(error);
        this.isLoading.next(false);
        this.ref.detectChanges();
        this.ref.reattach();
      }, complete: () => {
        this.isLoading.next(false);
      }
    })
  }

  onSubmitOTP() {
    this.loadingMessage = 'Verifying Code, Please Wait';
    this.isLoading.next(true);
    const phone = '+1' + this.phoneVerifyForm.get('phone')?.value;
    this.instnt?.verifyOTP(phone, this.otpVerifyForm.get('otpVerify')?.value);
    this.handler.OTPVerified.subscribe((data) => {
      console.log('OTP verified', data);
      this.isLoading.next(false);
    })

  }

}
