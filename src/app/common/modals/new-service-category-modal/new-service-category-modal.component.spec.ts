import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceCategoryModalComponent } from './new-service-category-modal.component';

describe('NewServiceCategoryModalComponent', () => {
  let component: NewServiceCategoryModalComponent;
  let fixture: ComponentFixture<NewServiceCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServiceCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
