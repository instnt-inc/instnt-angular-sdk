import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-instnt-angular',
  template: `
    <p>
      instnt-angular works!
    </p>
  `,
  styles: [
  ]
})
export class InstntAngularComponent implements OnInit {

  @Input() formKey: string = '';
  constructor() { }

  ngOnInit(): void {
  }
}
