import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instnt, InstntImageProcessorProps, InvitationResponse } from './interfaces/instnt.interface';
import { lastValueFrom, map, mapTo, Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstntAngularService {

  instnt: ReplaySubject<Instnt> = new ReplaySubject(1);
  credentialInvitation: ReplaySubject<InvitationResponse> = new ReplaySubject(1);

  constructor() {}

  getInstnt(): Observable<Instnt> {
    return this.instnt;
  }

  getCredentialInvitation(): Observable<InvitationResponse> {
    return this.credentialInvitation;
  }

  instntImageProcessor(docProps: InstntImageProcessorProps) {
    const documentCapture = (window as any).instnt.captureDocument;
    if (!(window as any).instnt.captureDocument) {
      console.error('Document Capture is Null, please run instnt.initImageProcessor() before running instntImageProcessor(props)');
      console.error(`If error persist try running instntImageProcessor inside a setTimeout() function i.e.
      setTimeout(() => {
        this.intntService.instntImageProcessor(props);
      }, 4000);`)
    } else {
      const prop: any = {
        documentType: docProps.documentType.toString(),
        documentSide: docProps.documentSide.toString(),
        captureMode: docProps.captureMode?.toString() || 'Auto',
        autoUpload: docProps.autoUpload || true,
        captureFrameworkDebug: docProps.captureFrameworkDebug || false
      }
      documentCapture(prop.documentType, prop.documentSide, prop.captureMode, prop.autoUpload, prop.captureFrameworkDebug);
    }
  }


}
