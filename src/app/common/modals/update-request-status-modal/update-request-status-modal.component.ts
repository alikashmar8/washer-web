import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceRequestsService } from 'src/app/services/service-requests.service';
import { RequestStatus } from './../../../../common/enums/request-status.enum';
import { ServiceRequest } from './../../../../models/service-request.model';

@Component({
  selector: 'app-update-request-status-modal',
  templateUrl: './update-request-status-modal.component.html',
  styleUrls: ['./update-request-status-modal.component.css'],
})
export class UpdateRequestStatusModal implements OnInit {
  @Input() serviceRequest: ServiceRequest;
  newStatus: RequestStatus;
  RequestStatus = RequestStatus;
  selectedDate: string;
  selectedTime: string;

  constructor(
    private serviceRequestsService: ServiceRequestsService,
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.serviceRequest) {
      this.activeModal.dismiss();
      return;
    }

    this.serviceRequest.confirmedDate =
      this.serviceRequest.confirmedDate ?? this.serviceRequest.requestedDate;
    const date = new Date(this.serviceRequest.confirmedDate);
    const length = date.toISOString().length;
    this.selectedDate = date.toISOString().slice(0, 10);
    this.selectedTime = date.toISOString().slice(11, length - 1);
  }

  updateStatus() {
    let selectedDateTime = null;
    if (this.newStatus == RequestStatus.APPROVED) {
      const dateTimeString = `${this.selectedDate}T${this.selectedTime}Z`;
      // Create a Date object from the combined string
      selectedDateTime = new Date(dateTimeString);
    }

    this.serviceRequestsService
      .changeStatus(this.serviceRequest.id, this.newStatus, selectedDateTime)
      .subscribe(
        (response) => {
          this.serviceRequest.status = this.newStatus;
          this.alertService.toastSuccess('Status updated successfully');
          this.activeModal.close(true);
        },
        (err) => {
          this.authService.handleHttpError(err);
        }
      );
  }
}
