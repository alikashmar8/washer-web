import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressUpdateModalComponent } from 'src/app/common/modals/address-update-modal/address-update-modal.component';
import { UpdateRequestStatusModal } from 'src/app/common/modals/update-request-status-modal/update-request-status-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceRequestsService } from 'src/app/services/service-requests.service';
import { InputType } from 'src/common/enums/input-type.enum';
import { RequestStatus } from 'src/common/enums/request-status.enum';
import { Branch } from 'src/models/branch.model';
import { ServiceRequest } from 'src/models/service-request.model';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css'],
})
export class BranchDetailsComponent implements OnInit {
  branch: Branch;
  branchId: string;
  mapLink: string = null;
  serviceRequests: ServiceRequest[] = [];
  requestsCount: number;
  requestsTotalPages: number = 1;
  currentRequestsPage: number = 1;
  RequestStatus = RequestStatus;
  take: number = 10;

  constructor(
    private branchesService: BranchesService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private serviceRequestsService: ServiceRequestsService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.branchId = this.route.snapshot.paramMap.get('id');
      this.loadingService.display(true);
      this.branch = await this.branchesService.getById(this.branchId);
      this.mapLink =
        'https://maps.google.com/maps?q=' +
        this.branch.address.lat +
        ',' +
        this.branch.address.lon +
        '&hl=en&zoom=19&output=embed';
      let serviceRequestsResponse = await this.serviceRequestsService.getAll(
        10,
        0,
        {
          branchId: this.branchId,
        }
      );
      this.serviceRequests = serviceRequestsResponse.data;
      this.requestsCount = serviceRequestsResponse.count;
      this.requestsTotalPages =
        this.requestsCount > 0 ? Math.ceil(this.requestsCount / 10) : 1;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  async getPageRecords(page: number) {
    if (page == this.currentRequestsPage && page != 1) return;
    try {
      let result = await this.serviceRequestsService.getAll(
        this.take,
        (page - 1) * this.take,
        {
          branchId: this.branchId,
        }
      );
      this.serviceRequests = [];
      this.serviceRequests = result.data;
      this.requestsCount = result.count;
      this.requestsTotalPages =
        result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentRequestsPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  openUpdateStatusModal(serviceRequest: ServiceRequest) {
    const modalRef = this.modalService.open(UpdateRequestStatusModal);
    modalRef.componentInstance.serviceRequest = serviceRequest;
  }

  switchPaidUnpaid(request: ServiceRequest) {
    let message = request.isPaid
      ? 'Are you sure you want to make this request as unpaid ?'
      : 'Are you sure you want to make this request as paid ?';

    const confirmed = confirm(message);
    if (confirmed) {
      this.serviceRequestsService
        .updatePaymentStatus(request.id, !request.isPaid)
        .subscribe(
          (res: any) => {
            if (res && res.affected > 0) {
              this.alertService.toastSuccess('request updated successfully');
              request.isPaid = !request.isPaid;
            } else {
              this.alertService.toastError('Error updating payment');
            }
          },
          (error) => {
            this.authService.handleHttpError(error);
          }
        );
    }
  }

  async openEditDescription() {
    const newValue = await this.alertService.dynamicInputDialog({
      inputType: InputType.TEXT,
      value: this.branch.description,
    });
    if (newValue) {
      this.branchesService
        .update(this.branch.id, {
          description: newValue,
        })
        .subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this.authService.handleHttpError(err);
          }
        );
    }
  }

  async openEditIsActive() {
    const newValue = await this.alertService.dynamicInputDialog({
      inputType: InputType.CHECKBOX,
      value: this.branch.isActive,
    });
    if (newValue == true || newValue == false) {
      this.branchesService
        .update(this.branch.id, {
          isActive: newValue,
        })
        .subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this.authService.handleHttpError(err);
          }
        );
    }
  }

  async openEditCoverageArea() {
    const newValue = await this.alertService.dynamicInputDialog({
      inputType: InputType.NUMBER,
      value: this.branch.coverageArea,
    });
    if (newValue && newValue != this.branch.coverageArea) {
      this.branchesService
        .update(this.branch.id, {
          coverageArea: newValue,
        })
        .subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this.authService.handleHttpError(err);
          }
        );
    }
  }

  openAddressEdit() {
    const modalRef = this.modalService.open(AddressUpdateModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.addressId = this.branch.addressId;
  }
}
