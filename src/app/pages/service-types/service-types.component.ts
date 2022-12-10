import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/common/modals/delete-modal/delete-modal.component';
import { NewServiceTypeModalComponent } from 'src/app/common/modals/new-service-type-modal/new-service-type-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceTypesService } from 'src/app/services/service-types.service';
import { backendUrl } from 'src/constants/api-constants';
import { Employee } from 'src/models/employee.model';
import { ServiceType } from 'src/models/service-type.model';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css'],
})
export class ServiceTypesComponent implements OnInit {
  currentEmployee: Employee;
  serviceTypes: ServiceType[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;
  backendUrl = backendUrl;

  filters: {
    search: string;
  } = {
    search: null,
  };

  constructor(
    private serviceTypesService: ServiceTypesService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.serviceTypesService.getAll(10, 0);
      this.serviceTypes = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openNewServiceTypeModal() {
    const modalRef = this.modalService.open(NewServiceTypeModalComponent, {
      size: 'lg',
    });
    modalRef.result.then((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  async getPageRecords(page: number) {
    if (page == this.currentPage && page != 1) return;
    try {
      let result = await this.serviceTypesService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.serviceTypes = [];
      this.serviceTypes = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  openDeleteModal(categoryId: string, name: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.name = name;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.serviceTypesService.delete(categoryId).subscribe(
            (result: any) => {
              if (result.affected > 0) {
                this.alertService.toastSuccess('Branch deleted successfully');
                window.location.reload();
              } else {
                this.alertService.toastError('Error deleting branch');
              }
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
}
