import { Injectable } from '@angular/core';

export interface UserData {
  firstName: string,
  surName: string,
  email: string,
  mobileNumber?: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  formId: string;
  serviceUrl: string;
  userData: UserData;
  docFrontUrl?: string;
  docBackUrl?: string;
  selfieUrl?: string;
  instntLogoUrl: string = 'https://www.instnt.org/hubfs/Favicon.png';

  constructor() {
    this.formId = 'v1633477069641729';
    this.serviceUrl = 'https://dev-api.instnt.org';
    this.userData = {
      firstName: '',
      surName: '',
      email: '',
      mobileNumber: '',
    }
  }

  public setUserData(firstName: string, lastName: string, email: string, mobileNumber: string) {
    this.userData = {
      firstName,
      surName: lastName,
      email,
      mobileNumber
    }
  }

  setMobileNumber(phone: string) {
    this.userData.mobileNumber = phone;
  }
}
