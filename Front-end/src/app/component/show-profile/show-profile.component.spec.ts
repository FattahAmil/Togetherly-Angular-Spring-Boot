import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileComponent } from './show-profile.component';

describe('ShowProfileComponent', () => {
  let component: ShowProfileComponent;
  let fixture: ComponentFixture<ShowProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProfileComponent]
    });
    fixture = TestBed.createComponent(ShowProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
