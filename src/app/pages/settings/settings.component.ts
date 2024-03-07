import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { Employee } from 'src/models/employee.model';
import { Setting } from 'src/models/setting.model';
import { UpdateSettingModal } from 'src/app/common/modals/update-setting-modal/update-setting-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  currentEmployee: Employee;
  settings: Setting[] = [];

  isWhatsappActive: boolean = false;
  whatsappQrCode: string = '';

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      this.settings = await this.settingsService.getAll();
      try {
        this.isWhatsappActive = await this.authService.getWhatsappStatus();
      } catch (error) {
        console.error('Whatsapp Status error');
        this.isWhatsappActive = false;
      }
      if (!this.isWhatsappActive) {
        this.whatsappQrCode = await this.authService.getWhatsappQrCode();
      }
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openUpdateModal(setting: Setting): void {
    const modalRef = this.modalService.open(UpdateSettingModal);
    modalRef.componentInstance.setting = setting;
  }

  async sendWhatsappTestMessage() {
    return await this.authService.sendWhatsappTestMessage();
  }

  async terminateWhatsapp() {
    return await this.authService.terminateWhatsappConfiguration();
  }
}
