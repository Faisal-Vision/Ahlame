import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToBtnComponent } from './back-to-btn.component';

describe('BackToBtnComponent', () => {
  let component: BackToBtnComponent;
  let fixture: ComponentFixture<BackToBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackToBtnComponent]
    });
    fixture = TestBed.createComponent(BackToBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
