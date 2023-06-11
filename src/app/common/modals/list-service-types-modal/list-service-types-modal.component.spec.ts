import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceTypesModalComponent } from './list-service-types-modal.component';

describe('ListServiceTypesModalComponent', () => {
  let component: ListServiceTypesModalComponent;
  let fixture: ComponentFixture<ListServiceTypesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceTypesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServiceTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
