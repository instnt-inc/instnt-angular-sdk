import { Injectable } from '@angular/core';

export interface UserData {
  firstName: string,
  surName: string,
  email: string,
  physicalAddress: string,
  city: string,
  state: string,
  zip: string,
  mobileNumber?: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  formKey: string;
  serviceUrl: string;
  userData: UserData;
  docFrontUrl?: string;
  docBackUrl?: string;
  selfieUrl?: string;
  instntLogoUrl: string = 'https://www.instnt.org/hubfs/Favicon.png';

  constructor() {
    this.formKey = 'v1648134849334794';
    this.serviceUrl = 'https://sandbox-api.instnt.org';
    this.userData = {
      firstName: '',
      surName: '',
      email: '',
      physicalAddress: '',
      city: '',
      state: '',
      zip: '',
      mobileNumber: '',
    }
  }

  public setUserData(firstName: string, lastName: string, email: string, physicalAddress: string, city: string, state: string, zip: string, mobileNumber: string) {
    this.userData = {
      firstName,
      surName: lastName,
      email,
      physicalAddress,
      city,
      state,
      zip,
      mobileNumber,
    }
  }

  setMobileNumber(phone: string) {
    this.userData.mobileNumber = phone;
  }
}
