import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InstntAngularModule, InstntAngularService } from 'projects/instnt-angular/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { SignupComponent } from './signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { EventHandlerService } from './services/event-handler.service';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupComponent,
    OtpVerificationComponent,
    DocumentUploadComponent,
    SubmitFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InstntAngularModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule
  ],
  providers: [ EventHandlerService, InstntAngularService, DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
