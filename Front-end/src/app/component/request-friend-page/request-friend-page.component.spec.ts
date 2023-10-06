import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFriendPageComponent } from './request-friend-page.component';

describe('RequestFriendPageComponent', () => {
  let component: RequestFriendPageComponent;
  let fixture: ComponentFixture<RequestFriendPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFriendPageComponent]
    });
    fixture = TestBed.createComponent(RequestFriendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
