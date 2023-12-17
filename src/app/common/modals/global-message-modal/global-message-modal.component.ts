import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-global-message-modal',
  templateUrl: './global-message-modal.component.html',
  styleUrls: ['./global-message-modal.component.css'],
})
export class GlobalMessageModalComponent implements OnInit {
  text: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private chatsService: ChatsService,
    private alertsService: AlertService
  ) {}

  ngOnInit(): void {}

  sendMessage() {
    if (!this.text) return;
    this.chatsService.sendGlobalMessage({ text: this.text }).subscribe(
      (res) => {
        this.alertsService.toastSuccess('Notification sending in progress...');
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
