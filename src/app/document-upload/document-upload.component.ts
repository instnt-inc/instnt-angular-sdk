import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Instnt, InstntAngularService } from 'projects/instnt-angular/src/public-api';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  isLoading = false;
  loadingMessage = '';
  instnt?: Instnt;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private intntService: InstntAngularService) { }

  ngOnInit(): void {
    this.intntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt
      this.instnt.initImageProcessor();
      setTimeout(() => {
        (window as any).documentCapture(
          'documentType',
          'documentSide',
          'Auto',
          true);
      }, 2000);
    });
    
  }


  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('Received webcam image');
    console.log(webcamImage);
    //this.webcamImage = webcamImage;
  }

}
