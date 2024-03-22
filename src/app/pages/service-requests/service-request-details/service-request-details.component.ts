import { ServiceRequestsService } from './../../../services/service-requests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { InputType } from 'src/common/enums/input-type.enum';
import { Employee } from 'src/models/employee.model';
import { ServiceRequest } from 'src/models/service-request.model';

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.css'],
})
export class ServiceRequestDetailsComponent implements OnInit {
  serviceRequest: ServiceRequest;
  serviceRequestId: string;
  employees: Employee[];
  currentEmployee: Employee;

  constructor(
    private serviceRequestsService: ServiceRequestsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private employeesService: EmployeesService,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      this.serviceRequestId = this.route.snapshot.paramMap.get('id');
      this.currentEmployee = this.authService.currentEmployee;
      this.serviceRequest = await this.serviceRequestsService.getById(
        this.serviceRequestId
      );
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  async assignEmployee() {
    try {
      const res = await this.employeesService.getAll(99, 0, {
        role: EmployeeRole.DRIVER,
        branchId: this.currentEmployee.branchId,
      });
      this.employees = res.data;
      const callback = await this.alertService.dynamicInputDialog({
        value: this.serviceRequest.employee?.id,
        inputType: InputType.SELECT,
        options: this.employees.map((employee) => {
          return {
            label: employee.firstName + ' ' + employee.lastName,
            value: employee.id,
          };
        }),
      });
      if (callback && callback != this.serviceRequest.employee?.id) {
        this.serviceRequestsService
          .assignEmployee(this.serviceRequest.id, callback)
          .subscribe(
            (res: any) => {
              this.alertService.toastSuccess('Employee assigned successfully');
              window.location.reload();
            },
            (err) => {
              this.authService.handleHttpError(err);
            }
          );
      }
      this.serviceRequest.requestedDate.toLocaleDateString
    } catch (err) {
      console.log(err);
      this.authService.handleHttpError(err);
    }
  }

  confirmNow() {
    const confirmed = confirm(
      'Are you sure you want to confirm this request now?'
    );
    if (confirmed) {
      this.serviceRequestsService
        .update(this.serviceRequestId, {
          confirmedDate: new Date().toISOString(),
        })
        .subscribe(
          (data) => {
            this.alertService.toastSuccess(
              'Service Request Confirmed Successfully'
            );
            window.location.reload();
          },
          (err) => {
            this.authService.handleHttpError(err);
          }
        );
    }
  }
}
