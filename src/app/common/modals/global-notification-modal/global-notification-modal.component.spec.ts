import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNotificationModalComponent } from './global-notification-modal.component';

describe('GlobalNotificationModalComponent', () => {
  let component: GlobalNotificationModalComponent;
  let fixture: ComponentFixture<GlobalNotificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalNotificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
