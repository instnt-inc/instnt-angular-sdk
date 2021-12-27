import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instnt-selfie-processor',
  template: `
  <div>
    <img src="" alt="">
  </div>
  `,
  styleUrls: []
})
export class InstntSelfieProcessorComponent implements OnInit {

  // documentType: string = 'License';
  // documentSide: string = '';
  captureMode?: string = 'Auto';
  autoUpload?: boolean = true;
  captureFrameworkDebug?: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const selfieCapture = (window as any).selfieCapture;
    if (!(window as any).DocumentSettings) {
      console.error('Document Capture is Null, please run instnt.initImageProcessor() before running instntImageProcessor(props)');
      console.error(`If error persist try running instntImageProcessor inside a setTimeout() function i.e.
      setTimeout(() => {
        this.intntService.instntImageProcessor(props);
      }, 4000);`)
    } else {
      selfieCapture(this.captureMode, this.autoUpload, this.captureFrameworkDebug);
    }
  }

}
