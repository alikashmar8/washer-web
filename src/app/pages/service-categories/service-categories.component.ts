import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/common/modals/delete-modal/delete-modal.component';
import { NewServiceCategoryModalComponent } from 'src/app/common/modals/new-service-category-modal/new-service-category-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceCategoriesService } from 'src/app/services/service-categories.service';
import { backendUrl } from 'src/constants/api-constants';
import { Employee } from 'src/models/employee.model';
import { ServiceCategory } from 'src/models/service-category.model';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.css'],
})
export class ServiceCategoriesComponent implements OnInit {
  currentEmployee: Employee;
  serviceCategories: ServiceCategory[] = [];
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
    private serviceCategoriesService: ServiceCategoriesService,
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
      let res = await this.serviceCategoriesService.getAll(10, 0);
      this.serviceCategories = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openNewServiceCategoryModal() {
    const modalRef = this.modalService.open(NewServiceCategoryModalComponent, {
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
      let result = await this.serviceCategoriesService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.serviceCategories = [];
      this.serviceCategories = result.data;
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
          this.serviceCategoriesService.delete(categoryId).subscribe(
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
      this.serviceCategoriesService.changeStatus(id, !isActive).subscribe(
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
