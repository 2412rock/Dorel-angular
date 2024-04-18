import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithUserMobileComponent } from './chat-with-user-mobile.component';

describe('ChatWithUserMobileComponent', () => {
  let component: ChatWithUserMobileComponent;
  let fixture: ComponentFixture<ChatWithUserMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWithUserMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatWithUserMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
