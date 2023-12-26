import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalNotificationModalComponent } from 'src/app/common/modals/global-notification-modal/global-notification-modal.component';
import { NewEmployeeModalComponent } from 'src/app/common/modals/new-employee-modal/new-employee-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { Branch } from 'src/models/branch.model';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  currentEmployee: Employee;
  employees: Employee[] = [];
  branches: Branch[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;
  displayFilters: boolean = false;

  filters: {
    search: string;
    branchId: string;
    role: EmployeeRole;
    isActive: boolean;
  } = {
    search: null,
    branchId: null,
    role: null,
    isActive: null,
  };
  EmployeeRole = EmployeeRole;

  constructor(
    private employeesService: EmployeesService,
    private branchesService: BranchesService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.employeesService.getAll(10, 0);
      this.employees = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;

      let branchesRes = await this.branchesService.getAll(99, 0);
      this.branches = branchesRes.data;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openNewEmployeeModal() {
    const modalRef = this.modalService.open(NewEmployeeModalComponent, {
      size: 'lg',
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  async getPageRecords(page: number) {
    if (page == this.currentPage && page != 1) return;
    try {
      let result = await this.employeesService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.employees = [];
      this.employees = result.data;
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

  sendGlobalNotification() {
    const modalRef = this.modalService.open(GlobalNotificationModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.forEmployees = true;
  }
}
