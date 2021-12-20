import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstntImageProcessorComponent } from './instnt-document-processor.component';

describe('InstntImageProcessorComponent', () => {
  let component: InstntImageProcessorComponent;
  let fixture: ComponentFixture<InstntImageProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstntImageProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstntImageProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
