import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressUpdateModalComponent } from './address-update-modal.component';

describe('AddressUpdateModalComponent', () => {
  let component: AddressUpdateModalComponent;
  let fixture: ComponentFixture<AddressUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
