import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMessageModalComponent } from './global-message-modal.component';

describe('GlobalMessageModalComponent', () => {
  let component: GlobalMessageModalComponent;
  let fixture: ComponentFixture<GlobalMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalMessageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
