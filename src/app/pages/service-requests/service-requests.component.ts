import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateRequestStatusModal } from 'src/app/common/modals/update-request-status-modal/update-request-status-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceRequestsService } from 'src/app/services/service-requests.service';
import { ServiceTypesService } from 'src/app/services/service-types.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { PaymentType } from 'src/common/enums/payment-type.enum';
import { RequestStatus } from 'src/common/enums/request-status.enum';
import { Branch } from 'src/models/branch.model';
import { Employee } from 'src/models/employee.model';
import { ServiceRequest } from 'src/models/service-request.model';
import { ServiceType } from 'src/models/service-type.model';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css'],
})
export class ServiceRequestsComponent implements OnInit {
  currentEmployee: Employee;
  serviceRequests: ServiceRequest[] = [];
  serviceTypes: ServiceType[] = [];

  employees: Employee[] = [];
  branches: Branch[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;
  displayFilters: boolean = false;
  EmployeeRole = EmployeeRole;
  RequestStatus = RequestStatus;
  filters: {
    search: string;
    branchId: string;
    isPaid: boolean;
    status: RequestStatus;
    fromDate: string;
    toDate: string;
    paymentType: PaymentType;
    serviceTypeId: string;
    employeeId: string;
  } = {
    search: null,
    branchId: null,
    isPaid: null,
    status: null,
    toDate: null,
    fromDate: null,
    paymentType: null,
    serviceTypeId: null,
    employeeId: null,
  };

  constructor(
    private employeesService: EmployeesService,
    private branchesService: BranchesService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private serviceRequestsService: ServiceRequestsService,
    private serviceTypesService: ServiceTypesService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.serviceRequestsService.getAll(10, 0);
      this.serviceRequests = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;

      let employeesRes = await this.employeesService.getAll(99, 0);
      this.employees = employeesRes.data;

      let branchesRes = await this.branchesService.getAll(99, 0);
      this.branches = branchesRes.data;

      let serviceTypesRes = await this.serviceTypesService.getAll(99, 0);
      this.serviceTypes = serviceTypesRes.data;

      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  async getPageRecords(page: number) {
    if (page == this.currentPage && page != 1) return;
    try {
      let result = await this.serviceRequestsService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.serviceRequests = [];
      this.serviceRequests = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  showHideFilters() {
    this.displayFilters = !this.displayFilters;
  }

  openUpdateStatusModal(serviceRequest: ServiceRequest) {
    const modalRef = this.modalService.open(UpdateRequestStatusModal);
    modalRef.componentInstance.serviceRequest = serviceRequest;
    //   modalRef.result.then(
    //   if (res) {
    //     this.serviceTypesService.changeStatus(id, !isActive).subscribe(
    //       (result: any) => {
    //         if (result.affected > 0) {
    //           this.alertService.toastSuccess('Operation successful');
    //           window.location.reload();
    //         } else {
    //           this.alertService.toastError('Error');
    //         }
    //       },
    //       (error) => {
    //         this.authService.handleHttpError(error);
    //       }
    //     );
    //   }
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
}
