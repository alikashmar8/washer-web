import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalMessageModalComponent } from 'src/app/common/modals/global-message-modal/global-message-modal.component';
import { GlobalNotificationModalComponent } from 'src/app/common/modals/global-notification-modal/global-notification-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UsersService } from 'src/app/services/users.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { Employee } from 'src/models/employee.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  currentEmployee: Employee;
  users: User[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;
  displayFilters: boolean = false;
  EmployeeRole = EmployeeRole;

  filters: {
    search: string;
  } = {
    search: null,
  };

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.usersService.getAll(10, 0);
      this.users = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
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
      let result = await this.usersService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.users = [];
      this.users = result.data;
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
    modalRef.componentInstance.forEmployees = false;
  }

  sendGlobalMessage() {
    const modalRef = this.modalService.open(GlobalMessageModalComponent, {
      size: 'lg',
    });
  }
}
