import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRateComponent } from './user-rate.component';

describe('UserRateComponent', () => {
  let component: UserRateComponent;
  let fixture: ComponentFixture<UserRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRateComponent]
    });
    fixture = TestBed.createComponent(UserRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
