import { NgModule } from '@angular/core';
import { InstntAngularComponent } from './instnt-angular.component';
import { HttpClientModule } from '@angular/common/http';
import { InstntSignupProviderComponent } from './instnt-signup-provider/instnt-signup-provider.component';
import { InstntImageProcessorComponent } from './instnt-document-processor/instnt-document-processor.component';
import { InstntSelfieProcessorComponent } from './instnt-selfie-processor/instnt-selfie-processor.component';



@NgModule({
  declarations: [
    InstntAngularComponent,
    InstntSignupProviderComponent,
    InstntImageProcessorComponent,
    InstntSelfieProcessorComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    InstntSignupProviderComponent,
    InstntImageProcessorComponent,
  ]
})
export class InstntAngularModule { }
