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
    const captureSelfie = (window as any).instnt.captureSelfie;
    if ((window as any).instnt) {
      if (!(window as any).instnt.captureSelfie) {
        console.error('captureSelfie is Null, please run instnt.initImageProcessor() before running instntImageProcessor(props)');
        console.error(`If error persist try running instntImageProcessor inside a setTimeout() function i.e.
        setTimeout(() => {
          this.intntService.instntImageProcessor(props);
        }, 4000);`)
      } else {
        const selfieSettings = { captureMode: this.captureMode }
        captureSelfie(selfieSettings, this.autoUpload, this.captureFrameworkDebug);
      }
    } else {
      console.error('instnt is Null, please make sure to instantiate instnt by using the <instnt-signup-provider> component');
    }
  }

}
