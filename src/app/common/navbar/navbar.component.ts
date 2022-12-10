import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentEmployee: Employee;
  EmployeeRole = EmployeeRole;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.currentEmployee = this.authService.currentEmployee;
  }

  isCurrentRoute(param: string) {
    return param == this.router.url;
  }

  logout() {
    const res = this.authService.logout();
    if (res) {
      window.location.reload();
    } else {
      this.alertService.toastError('Error occurred!');
    }
  }
}
