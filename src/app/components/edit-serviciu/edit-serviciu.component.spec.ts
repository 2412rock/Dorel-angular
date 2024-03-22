import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiciuComponent } from './edit-serviciu.component';

describe('EditServiciuComponent', () => {
  let component: EditServiciuComponent;
  let fixture: ComponentFixture<EditServiciuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiciuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiciuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
