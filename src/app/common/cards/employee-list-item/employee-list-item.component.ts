import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { Employee } from 'src/models/employee.model';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { ShowEmployeeModal } from '../../modals/show-employee-modal/show-employee-modal.component';

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['./employee-list-item.component.css'],
})
export class EmployeeListItemComponent implements OnInit {
  @Input() employee: Employee;

  EmployeeRole: EmployeeRole;
  isActive: boolean = true;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private authService: AuthService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {}

  openDeleteModal(employeeId: string, employeeName: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.name = employeeName;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.employeesService.delete(employeeId).subscribe(
            (result: any) => {
              window.location.reload();
              this.alertService.toastSuccess('Employee deleted successfully');
            },
            (error) => {
              this.authService.handleHttpError(error);
            }
          );
        }
      },
      (rejected) => {}
    );
  }

  openDetailModal(employee) {
    const modalRef = this.modalService.open(ShowEmployeeModal, { size: 'lg' });
    modalRef.componentInstance.employee = this.employee;
  }
}
