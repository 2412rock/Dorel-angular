import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySuccessComponentComponent } from './verify-success-component.component';

describe('VerifySuccessComponentComponent', () => {
  let component: VerifySuccessComponentComponent;
  let fixture: ComponentFixture<VerifySuccessComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifySuccessComponentComponent]
    });
    fixture = TestBed.createComponent(VerifySuccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
