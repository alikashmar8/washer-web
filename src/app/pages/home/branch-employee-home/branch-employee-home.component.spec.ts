import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchEmployeeHomeComponent } from './branch-employee-home.component';

describe('BranchEmployeeHomeComponent', () => {
  let component: BranchEmployeeHomeComponent;
  let fixture: ComponentFixture<BranchEmployeeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchEmployeeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchEmployeeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
