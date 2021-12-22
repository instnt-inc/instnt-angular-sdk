import { Component, OnInit } from '@angular/core';
import { Instnt, InstntAngularService } from 'instnt-angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  instnt?: Instnt;

  constructor(public instntService: InstntAngularService) { }

  ngOnInit(): void {
    this.instntService.getInstnt().subscribe((instnt) => {
      this.instnt = instnt;
      
    })

  }

  submitApplication() {
    this.instnt?.submitData({firstName: ''}, false);
  }

}
