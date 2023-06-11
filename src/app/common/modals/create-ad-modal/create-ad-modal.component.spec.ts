import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdModalComponent } from './create-ad-modal.component';

describe('CreateAdModalComponent', () => {
  let component: CreateAdModalComponent;
  let fixture: ComponentFixture<CreateAdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
