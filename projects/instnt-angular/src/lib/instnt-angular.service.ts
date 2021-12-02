import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instnt } from './interfaces/instnt.interface';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstntAngularService {

  instnt: ReplaySubject<Instnt> = new ReplaySubject(1);

  constructor() {

   }

  getInstnt(): Observable<Instnt> {
    return this.instnt;
  }

  
}
