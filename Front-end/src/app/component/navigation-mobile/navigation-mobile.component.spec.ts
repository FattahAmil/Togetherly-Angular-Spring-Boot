import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMobileComponent } from './navigation-mobile.component';

describe('NavigationMobileComponent', () => {
  let component: NavigationMobileComponent;
  let fixture: ComponentFixture<NavigationMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationMobileComponent]
    });
    fixture = TestBed.createComponent(NavigationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
