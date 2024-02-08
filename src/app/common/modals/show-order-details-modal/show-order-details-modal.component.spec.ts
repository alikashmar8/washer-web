import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderDetailsModalComponent } from './show-order-details-modal.component';

describe('ShowOrderDetailsModalComponent', () => {
  let component: ShowOrderDetailsModalComponent;
  let fixture: ComponentFixture<ShowOrderDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
