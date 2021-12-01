import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstntAngularComponent } from './instnt-angular.component';

describe('InstntAngularComponent', () => {
  let component: InstntAngularComponent;
  let fixture: ComponentFixture<InstntAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstntAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstntAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
