import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSearchBarComponent } from './generic-search-bar.component';

describe('GenericSearchBarComponent', () => {
  let component: GenericSearchBarComponent;
  let fixture: ComponentFixture<GenericSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericSearchBarComponent]
    });
    fixture = TestBed.createComponent(GenericSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
