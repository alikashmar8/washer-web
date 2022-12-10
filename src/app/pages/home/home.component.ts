import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentEmployee: Employee;
  EmployeeRole: EmployeeRole;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentEmployee = this.authService.currentEmployee;
  }
}
