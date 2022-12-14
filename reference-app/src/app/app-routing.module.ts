import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'otp-verify',
    component: OtpVerificationComponent
  },
  {
    path: 'doc-upload',
    component: DocumentUploadComponent
  },
  {
    path: 'submit-form',
    component: SubmitFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
