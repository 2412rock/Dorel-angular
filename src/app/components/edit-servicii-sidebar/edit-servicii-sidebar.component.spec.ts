import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiciiSidebarComponent } from './edit-servicii-sidebar.component';

describe('EditServiciiSidebarComponent', () => {
  let component: EditServiciiSidebarComponent;
  let fixture: ComponentFixture<EditServiciiSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiciiSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiciiSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
