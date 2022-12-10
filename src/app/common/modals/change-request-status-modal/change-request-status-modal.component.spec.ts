import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestStatusModalComponent } from './change-request-status-modal.component';

describe('ChangeRequestStatusModalComponent', () => {
  let component: ChangeRequestStatusModalComponent;
  let fixture: ComponentFixture<ChangeRequestStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRequestStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRequestStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
