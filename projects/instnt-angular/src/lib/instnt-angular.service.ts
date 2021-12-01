import { Injectable } from '@angular/core';
import { InstntSignupProviderProps } from '../public-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstntAngularService {

  constructor(private http: HttpClient) { }

  public instntInit(props: InstntSignupProviderProps) {
    const data = {
      form_key: props.form_key,
      hide_form_fields: true,
      redirect: false,
    }
    return this.http.post(props.serviceURL + '/public/transactions?idmetrics_version=4.5.4', data);
  }
}
