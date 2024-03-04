import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiciiComponent } from './edit-servicii.component';

describe('EditServiciiComponent', () => {
  let component: EditServiciiComponent;
  let fixture: ComponentFixture<EditServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiciiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
