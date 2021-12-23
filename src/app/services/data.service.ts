import { Injectable } from '@angular/core';

export interface UserData {
  firstName: string,
  surName: string,
  Email: string,
  mobileNumber: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData: UserData;
  docFrontUrl?: string;
  docBackUrl?: string;
  selfieUrl?: string;

  constructor() {
    this.userData = {
      firstName: '',
      surName: '',
      Email: '',
      mobileNumber: '',
    }
  }

  public setUserData(firstName: string, lastName: string, email: string, mobileNumber: string) {
    this.userData = {
      firstName,
      surName: lastName,
      Email: email,
      mobileNumber
    }
  }

  setMobileNumber(phone: string) {
    this.userData.mobileNumber = phone;
  }
}
