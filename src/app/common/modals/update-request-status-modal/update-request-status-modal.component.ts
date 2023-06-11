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
  }

  updateStatus() {
    this.serviceRequestsService
      .changeStatus(this.serviceRequest.id, this.newStatus)
      .subscribe(
        (response) => {
          this.serviceRequest.status = this.newStatus
          this.alertService.toastSuccess('Status updated successfully');
          this.activeModal.close(true);
        },
        (err) => {
          this.authService.handleHttpError(err);
        }
      );
  }
}
