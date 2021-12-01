import { NgModule } from '@angular/core';
import { InstntAngularComponent } from './instnt-angular.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InstntAngularComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    InstntAngularComponent
  ]
})
export class InstntAngularModule { }
