import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLatestMessagesComponent } from './show-latest-messages.component';

describe('ShowLatestMessagesComponent', () => {
  let component: ShowLatestMessagesComponent;
  let fixture: ComponentFixture<ShowLatestMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLatestMessagesComponent]
    });
    fixture = TestBed.createComponent(ShowLatestMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
