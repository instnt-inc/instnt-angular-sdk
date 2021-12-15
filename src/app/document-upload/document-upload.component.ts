import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  isLoading = false;
  loadingMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

  }

}
