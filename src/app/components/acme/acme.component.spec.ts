import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcmeComponent } from './acme.component';

describe('AcmeComponent', () => {
  let component: AcmeComponent;
  let fixture: ComponentFixture<AcmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcmeComponent]
    });
    fixture = TestBed.createComponent(AcmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
