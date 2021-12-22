import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'instnt-document-processor',
  template: `
  <div>
    <img src="" alt="">
  </div>
  `,
  styleUrls: []
})
export class InstntDocumentProcessorComponent implements OnInit {

  @Input() documentType: string = '';
  @Input() documentSide: string = '';
  @Input() captureMode?: string = 'Auto';
  @Input() autoUpload?: boolean = true;
  @Input() captureFrameworkDebug?: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('Image Proccessor onInit()');
    const documentCapture = (window as any).documentCapture;
    //console.log('docCapture', documentCapture);
    if (!(window as any).DocumentSettings) {
      console.error('Document Capture is Null, please run instnt.initImageProcessor() before running instntImageProcessor(props)');
      console.error(`If error persist try running instntImageProcessor inside a setTimeout() function i.e.
      setTimeout(() => {
        this.intntService.instntImageProcessor(props);
      }, 4000);`)
    } else {
      console.log('Document Settings not Null');
      documentCapture(this.documentType, this.documentSide, this.captureMode, this.autoUpload, this.captureFrameworkDebug);
    }
  }

}
