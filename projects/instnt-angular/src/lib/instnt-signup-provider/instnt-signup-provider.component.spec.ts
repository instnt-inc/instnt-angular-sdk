import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstntSignupProviderComponent } from './instnt-signup-provider.component';

describe('InstntSignupProviderComponent', () => {
  let component: InstntSignupProviderComponent;
  let fixture: ComponentFixture<InstntSignupProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstntSignupProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstntSignupProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
