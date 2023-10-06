import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostProfileComponent } from './show-post-profile.component';

describe('ShowPostProfileComponent', () => {
  let component: ShowPostProfileComponent;
  let fixture: ComponentFixture<ShowPostProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPostProfileComponent]
    });
    fixture = TestBed.createComponent(ShowPostProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
