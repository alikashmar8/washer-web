import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoModal } from './new-promo-modal.component';

describe('NewPromoModalComponent', () => {
  let component: NewPromoModal;
  let fixture: ComponentFixture<NewPromoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPromoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPromoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
