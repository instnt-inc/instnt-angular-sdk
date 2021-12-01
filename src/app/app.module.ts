import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InstntAngularModule } from 'projects/instnt-angular/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InstntAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
