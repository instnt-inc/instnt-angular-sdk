import { NgModule } from '@angular/core';
import { InstntAngularComponent } from './instnt-angular.component';
import { HttpClientModule } from '@angular/common/http';
import { InstntSignupProviderComponent } from './instnt-signup-provider/instnt-signup-provider.component';



@NgModule({
  declarations: [
    InstntAngularComponent,
    InstntSignupProviderComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    InstntAngularComponent,
    InstntSignupProviderComponent
  ]
})
export class InstntAngularModule { }
