import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithUserMenuItemComponent } from './chat-with-user-menu-item.component';

describe('ChatWithUserMenuItemComponent', () => {
  let component: ChatWithUserMenuItemComponent;
  let fixture: ComponentFixture<ChatWithUserMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWithUserMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatWithUserMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
