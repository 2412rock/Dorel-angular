import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignServiciiComponent } from './assign-servicii.component';

describe('AssignServiciiComponent', () => {
  let component: AssignServiciiComponent;
  let fixture: ComponentFixture<AssignServiciiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignServiciiComponent]
    });
    fixture = TestBed.createComponent(AssignServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
