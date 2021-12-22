import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstntDocumentProcessorComponent } from './instnt-document-processor.component';

describe('InstntImageProcessorComponent', () => {
  let component: InstntDocumentProcessorComponent;
  let fixture: ComponentFixture<InstntDocumentProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstntDocumentProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstntDocumentProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
