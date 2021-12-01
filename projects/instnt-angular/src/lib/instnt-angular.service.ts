import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstntAngularService {

  constructor() { }

  public onSubmitName(firstName: string, lastName: string) {
    return `${firstName} ${lastName} Passed!`
  }
}
