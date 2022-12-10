import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceRequestsService } from 'src/app/services/service-requests.service';
import { RequestStatus } from 'src/common/enums/request-status.enum';

@Component({
  selector: 'app-change-request-status-modal',
  templateUrl: './change-request-status-modal.component.html',
  styleUrls: ['./change-request-status-modal.component.css'],
})
export class ChangeRequestStatusModalComponent implements OnInit {
  @Input() currentStatus: string;
  @Input() id: string;
  status: RequestStatus;
  public RequestStatus = RequestStatus;
  constructor(
    private authService: AuthService,
    private serviceRequestsService: ServiceRequestsService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  updateStatus(status: RequestStatus) {
    this.serviceRequestsService.changeStatus(this.id, status).subscribe(
      (res: any) => {
        if (res.affected > 0) {
          this.alertService.toastSuccess('Status updated successfully');
          window.location.reload();
        } else {
          this.alertService.toastError('Error updating status');
        }
      },
      (err: any) => {
        this.authService.handleHttpError(err)
      }
    );
  }
}
