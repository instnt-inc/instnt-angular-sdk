import { NgModule } from '@angular/core';
import { InstntAngularComponent } from './instnt-angular.component';
import { HttpClientModule } from '@angular/common/http';
import { InstntSignupProviderComponent } from './instnt-signup-provider/instnt-signup-provider.component';
import { InstntDocumentProcessorComponent } from './instnt-document-processor/instnt-document-processor.component';
import { InstntSelfieProcessorComponent } from './instnt-selfie-processor/instnt-selfie-processor.component';



@NgModule({
  declarations: [
    InstntAngularComponent,
    InstntSignupProviderComponent,
    InstntDocumentProcessorComponent,
    InstntSelfieProcessorComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    InstntSignupProviderComponent,
    InstntDocumentProcessorComponent,
    InstntSelfieProcessorComponent,
  ]
})
export class InstntAngularModule { }
