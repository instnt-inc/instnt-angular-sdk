import { Injectable } from '@angular/core';
import { InstntSignupProviderProps } from '../public-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstntAngularService {

  constructor(public http: HttpClient) { }

  public onSubmitName(firstName: string, lastName: string) {
    return `${firstName} ${lastName} Passed!`
  }

  public instntInit(props: InstntSignupProviderProps) {
    return this.http.get(props.serviceURL + '/public/transactions?idmetrics_version=4.5.4');
  }
}
