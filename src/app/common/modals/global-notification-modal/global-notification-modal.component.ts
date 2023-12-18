import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SendGlobalNotificationDTO } from 'src/dtos/send-global-notification.dto';

@Component({
  selector: 'app-global-notification-modal',
  templateUrl: './global-notification-modal.component.html',
  styleUrls: ['./global-notification-modal.component.css'],
})
export class GlobalNotificationModalComponent implements OnInit {
  @Input() forEmployees = true;

  data: SendGlobalNotificationDTO = {
    title: null,
    body: null,
    forEmployees: null,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private notificationsService: NotificationsService,
    private alertsService: AlertService
  ) {}

  ngOnInit(): void {}

  sendNotification() {
    this.data.forEmployees = this.forEmployees;
    this.notificationsService.sendGlobalNotification(this.data).subscribe(
      (res) => {
        this.alertsService.toastSuccess('Notification sent successfully');
        this.activeModal.close(true);
      },
      (err) => {
        console.error(err);
        this.alertsService.toastError('Error sending notification!');
        this.activeModal.close(true);
      }
    );
  }
}
