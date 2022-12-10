import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchModalComponent } from './new-branch-modal.component';

describe('NewBranchModalComponent', () => {
  let component: NewBranchModalComponent;
  let fixture: ComponentFixture<NewBranchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
