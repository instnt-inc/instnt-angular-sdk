import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { DocumentSide, DocumentType, Instnt, InstntAngularService, InstntImageProcessorProps } from 'projects/instnt-angular/src/public-api';
import { Observable, Subject } from 'rxjs';
import { EventHandlerService } from '../services/event-handler.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  isLoading = false;
  loadingMessage = '';
  instnt?: Instnt;
  captureTarget = '';
  frontImgUrl: string = '';

  constructor(private intntService: InstntAngularService, public events: EventHandlerService) { }

  ngOnInit(): void {
    this.intntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
    });
    this.events.DocumentCaptured.subscribe((data) => {
      console.log('data from eventhandled', data);
      console.log('url =', data.data.captureResult?.result)
      this.captureTarget = '';
      if(data.captureResult?.result) {
        this.frontImgUrl = data.data.captureResult?.result
      }
    })

  }

  startCamera(target: string) {
    this.captureTarget = target;

  }

  onStartCamera(side: string) {
    // const imageProps: InstntImageProcessorProps = {
    //   documentType: DocumentType.License,
    //   documentSide: <DocumentSide>side
    // }
    // this.intntService.instntImageProcessor(imageProps);
    // this.events.DocumentCaptured.subscribe((data) => {
    //   console.log('data from eventhandled', data);
    //   console.log('url =', data.captureResult?.result)
    //   this.frontImgUrl = data.data.captureResult?.result
    // })
  }



}
