import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSearchPageComponent } from './basic-search-page.component';

describe('BasicSearchPageComponent', () => {
  let component: BasicSearchPageComponent;
  let fixture: ComponentFixture<BasicSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicSearchPageComponent]
    });
    fixture = TestBed.createComponent(BasicSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
