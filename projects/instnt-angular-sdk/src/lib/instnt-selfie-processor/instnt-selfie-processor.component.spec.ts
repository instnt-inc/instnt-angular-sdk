import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstntSelfieProcessorComponent } from './instnt-selfie-processor.component';

describe('InstntSelfieProcessorComponent', () => {
  let component: InstntSelfieProcessorComponent;
  let fixture: ComponentFixture<InstntSelfieProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstntSelfieProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstntSelfieProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
