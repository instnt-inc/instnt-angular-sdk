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
    const captureDocument = (window as any).instnt.captureDocument;
    if ((window as any).instnt) {
      if (!(window as any).instnt.captureDocument) {
        console.error('Document Capture is Null, please run instnt.initImageProcessor() before running instntImageProcessor(props)');
        console.error(`If error persist try running instntImageProcessor inside a setTimeout() function i.e.
      setTimeout(() => {
        this.intntService.instntImageProcessor(props);
      }, 4000);`)
      } else {
        captureDocument(this.documentType, this.documentSide, this.captureMode, this.autoUpload, this.captureFrameworkDebug);
      }
    } else {
      console.error('instnt is Null, please make sure to instantiate instnt by using the <instnt-signup-provider> component');
    }
  }

}
