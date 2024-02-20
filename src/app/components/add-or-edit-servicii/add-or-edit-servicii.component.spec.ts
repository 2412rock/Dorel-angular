import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditServiciiComponent } from './add-or-edit-servicii.component';

describe('AddOrEditServiciiComponent', () => {
  let component: AddOrEditServiciiComponent;
  let fixture: ComponentFixture<AddOrEditServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditServiciiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
