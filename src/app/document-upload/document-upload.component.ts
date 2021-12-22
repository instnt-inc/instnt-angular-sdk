import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  //frontImgUrl: string = 'https://thispersondoesnotexist.com/image';
  frontImgUrl: string = '';
  backImgUrl: string = '';
  selfieImgUrl: string = '';

  constructor(private intntService: InstntAngularService, public events: EventHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.intntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
    });
    this.events.DocumentCaptured.subscribe((res) => {
      if (res.data.captureResult?.result) {
        if (this.captureTarget === 'Front') {
          this.frontImgUrl = res.data.captureResult?.result;
        } else if (this.captureTarget === 'Back') {
          this.backImgUrl = res.data.captureResult?.result;
        } else if (this.captureTarget === 'Selfie') {
          this.selfieImgUrl = res.data.captureResult?.result;
        }
      }
      this.captureTarget = '';
    })

  }

  startCamera(target: string) {
    this.captureTarget = target;
  }

  onGoToNextStep() {
    this.instnt?.verifyDocuments('License');
    this.router.navigate(['review']);
  }




}
