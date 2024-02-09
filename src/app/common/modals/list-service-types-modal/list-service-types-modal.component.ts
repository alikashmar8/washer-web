import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypesService } from 'src/app/services/service-types.service';
import { backendUrl, mediaRoot } from 'src/constants/api-constants';
import { ServiceType } from 'src/models/service-type.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NewServiceTypeModalComponent } from '../new-service-type-modal/new-service-type-modal.component';
import { InputType } from 'src/common/enums/input-type.enum';
import { Employee } from 'src/models/employee.model';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';

@Component({
  selector: 'app-list-service-types-modal',
  templateUrl: './list-service-types-modal.component.html',
  styleUrls: ['./list-service-types-modal.component.css'],
})
export class ListServiceTypesModal implements OnInit {
  @Input() public serviceTypes: ServiceType[] = [];
  backendUrl: string = backendUrl;
  currentEmployee: Employee;
  EmployeeRole = EmployeeRole;

  constructor(
    private modalService: NgbModal,
    private serviceTypesService: ServiceTypesService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentEmployee = this.authService.currentEmployee;
  }

  openNewServiceTypeModal() {
    const modalRef = this.modalService.open(NewServiceTypeModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.categoryId = this.serviceTypes[0].categoryId;
    modalRef.result.then((result) => {
      window.location.reload();
    });
  }

  openDeleteModal(categoryId: string, name: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.name = name;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.serviceTypesService.delete(categoryId).subscribe(
            (result: any) => {
              window.location.reload();
              this.alertService.toastSuccess(
                'Service Type deleted successfully'
              );
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

  openEnableDisableModal(id: string, name: string, isActive: boolean) {
    let res;
    if (isActive) {
      res = confirm(`Are you sure you want to disable ${name} ?`);
    } else {
      res = confirm(`Are you sure you want to enable ${name} ?`);
    }
    if (res) {
      this.serviceTypesService.changeStatus(id, !isActive).subscribe(
        (result: any) => {
          if (result.affected > 0) {
            this.alertService.toastSuccess('Operation successful');
            window.location.reload();
          } else {
            this.alertService.toastError('Error');
          }
        },
        (error) => {
          this.authService.handleHttpError(error);
        }
      );
    }
  }

  async openUpdateNameModal(type: ServiceType) {
    const res: string = await this.alertService.dynamicInputDialog({
      value: type.name,
      inputType: InputType.TEXT,
      options: [],
    });

    if (res && res != type.name) {
      this.serviceTypesService
        .update(type.id, {
          name: res,
        })
        .subscribe(
          (response) => {
            this.alertService.toastSuccess('Updated successfully');
            type.name = res;
          },
          (exception) => {
            this.alertService.toastError('Error updating!');
            this.authService.handleHttpError(exception);
          }
        );
    }
  }

  async openUpdatePriceModal(type: ServiceType) {
    const res: any = await this.alertService.dynamicInputDialog({
      value: type.price,
      inputType: InputType.NUMBER,
      options: [],
    });

    if (res && res != type.price) {
      this.serviceTypesService
        .update(type.id, {
          price: res,
        })
        .subscribe(
          (response) => {
            this.alertService.toastSuccess('Updated successfully');
            type.price = res;
          },
          (exception) => {
            this.alertService.toastError('Error updating!');
            this.authService.handleHttpError(exception);
          }
        );
    }
  }

  async openUpdateLogoModal(type: ServiceType) {
    const res: any = await this.alertService.dynamicInputDialog({
      value: mediaRoot + type.icon,
      inputType: InputType.IMAGE,
      options: [],
    });

    if (res) {
      let data = new FormData();
      data.append('icon', res, res.name);
      this.serviceTypesService.update(type.id, data).subscribe(
        (response) => {
          this.alertService.toastSuccess('Updated successfully');
          window.location.reload();
        },
        (exception) => {
          this.alertService.toastError('Error updating!');
          this.authService.handleHttpError(exception);
        }
      );
    }
  }
}
