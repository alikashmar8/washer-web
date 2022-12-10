import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceTypeModalComponent } from './new-service-type-modal.component';

describe('NewServiceTypeModalComponent', () => {
  let component: NewServiceTypeModalComponent;
  let fixture: ComponentFixture<NewServiceTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServiceTypeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
