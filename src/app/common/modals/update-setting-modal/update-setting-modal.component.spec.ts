import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSettingModalComponent } from './update-setting-modal.component';

describe('UpdateSettingModalComponent', () => {
  let component: UpdateSettingModalComponent;
  let fixture: ComponentFixture<UpdateSettingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSettingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
