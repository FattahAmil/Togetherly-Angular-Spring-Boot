import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserPageComponent } from './chat-user-page.component';

describe('ChatUserPageComponent', () => {
  let component: ChatUserPageComponent;
  let fixture: ComponentFixture<ChatUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatUserPageComponent]
    });
    fixture = TestBed.createComponent(ChatUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
