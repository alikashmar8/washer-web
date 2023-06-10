import { loadingGifUrl } from 'src/constants/constants';
import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Setting } from 'src/models/setting.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-update-setting-modal',
  templateUrl: './update-setting-modal.component.html',
  styleUrls: ['./update-setting-modal.component.css'],
})
export class UpdateSettingModal implements OnInit {
  @Input() setting: Setting;

  isUpdateLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private settingsService: SettingsService,
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.setting) {
      this.activeModal.dismiss();
      return;
    }
  }

  updateSetting() {
    this.settingsService
      .update(this.setting.id, { value: this.setting.value })
      .subscribe(
        (result) => {
          this.alertService.toastSuccess('Update Successful');
          this.activeModal.close(true);
          window.location.reload();
        },
        (error) => {
          this.authService.handleHttpError(error);
        }
      );
  }
}
