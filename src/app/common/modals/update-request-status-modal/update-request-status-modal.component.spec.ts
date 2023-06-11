import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestStatusModalComponent } from './update-request-status-modal.component';

describe('UpdateRequestStatusModalComponent', () => {
  let component: UpdateRequestStatusModalComponent;
  let fixture: ComponentFixture<UpdateRequestStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
