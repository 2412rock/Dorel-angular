import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDescritionImagesComponent } from './add-descrition-images.component';

describe('AddDescritionImagesComponent', () => {
  let component: AddDescritionImagesComponent;
  let fixture: ComponentFixture<AddDescritionImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDescritionImagesComponent]
    });
    fixture = TestBed.createComponent(AddDescritionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
