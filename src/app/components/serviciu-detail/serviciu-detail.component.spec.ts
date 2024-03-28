import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciuDetailComponent } from './serviciu-detail.component';

describe('ServiciuDetailComponent', () => {
  let component: ServiciuDetailComponent;
  let fixture: ComponentFixture<ServiciuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciuDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
