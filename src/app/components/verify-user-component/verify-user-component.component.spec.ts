import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserComponentComponent } from './verify-user-component.component';

describe('VerifyUserComponentComponent', () => {
  let component: VerifyUserComponentComponent;
  let fixture: ComponentFixture<VerifyUserComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyUserComponentComponent]
    });
    fixture = TestBed.createComponent(VerifyUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
