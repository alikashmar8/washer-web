import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { loadingGifUrl } from 'src/constants/constants';
import { CreateEmployeeDTO } from 'src/dtos/create-employee.dto';
import { Branch } from 'src/models/branch.model';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-new-employee-modal',
  templateUrl: './new-employee-modal.component.html',
  styleUrls: ['./new-employee-modal.component.css'],
})
export class NewEmployeeModalComponent implements OnInit {
  currentEmployee: Employee;
  employee: CreateEmployeeDTO = {
    firstName: null,
    lastName: null,
    password: null,
    role: null,
    username: null,
    email: null,
    phoneNumber: null,
    branchId: null,
  };

  count: number;
  branches: Branch[] = [];

  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  EmployeeRole = EmployeeRole;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private employeesService: EmployeesService,
    private branchesService: BranchesService
  ) {
    this.currentEmployee = authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      let res = await this.branchesService.getAll(99, 0);
      this.branches = res.data;
      this.count = res.count;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  store() {
    this.isStoreLoading = true;
    if (!this.employee.firstName || !this.employee.firstName) {
      this.alertService.toastError('Employee name should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.employee.username) {
      this.alertService.toastError('Employee username should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.employee.password) {
      this.alertService.toastError('Employee password should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.employee.phoneNumber) {
      this.alertService.toastError('Employee phone number should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.employee.role) {
      this.alertService.toastError('Employee role should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (
      !this.employee.branchId &&
      [EmployeeRole.BRANCH_EMPLOYEE, EmployeeRole.DRIVER].includes(
        this.employee.role
      )
    ) {
      this.alertService.toastError('Branch should be selected');
      this.isStoreLoading = false;
      return;
    }

    this.employeesService.store(this.employee).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.toastSuccess('Employee Added Successfully');
        this.isStoreLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.authService.handleHttpError(error);
        this.isStoreLoading = false;
      },
    });
  }
}
