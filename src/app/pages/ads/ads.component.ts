import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAdModalComponent } from 'src/app/common/modals/create-ad-modal/create-ad-modal.component';
import { DeleteModalComponent } from 'src/app/common/modals/delete-modal/delete-modal.component';
import { AdsService } from 'src/app/services/ads.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { InputType } from 'src/common/enums/input-type.enum';
import { backendUrl, mediaRoot } from 'src/constants/api-constants';
import { Ad } from 'src/models/ad.model';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  currentEmployee: Employee;
  ads: Ad[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;
  displayFilters: boolean = false;
  backendUrl = backendUrl;
  EmployeeRole = EmployeeRole;

  filters: {
    search: string;
  } = {
    search: null,
  };

  constructor(
    private adsService: AdsService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.adsService.getAll(10, 0);
      this.ads = res.data;
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
      let result = await this.adsService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.ads = [];
      this.ads = result.data;
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

  async openUpdateAdModal(ad: Ad) {
    const res: any = await this.alertService.dynamicInputDialog({
      value: mediaRoot + ad.image,
      inputType: InputType.IMAGE,
      options: [],
    });

    if (res) {
      let data = new FormData();
      data.append('image', res, res.name);
      this.adsService.update(ad.id, data).subscribe(
        (response) => {
          this.alertService.toastSuccess('Ad Updated Successfully');
          window.location.reload();
        },
        (exception) => {
          this.alertService.toastError('Error Updating Ad');
          this.authService.handleHttpError(exception);
        }
      );
    }
  }

  openDeleteModal(adId: string, title: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.name = title;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.adsService.delete(adId).subscribe(
            (result: any) => {
              if (result.affected > 0) {
                this.alertService.toastSuccess('Ad Deleted Successfully');
                window.location.reload();
              } else {
                this.alertService.toastError('Error Deleting Ad');
              }
            },
            (error) => {
              this.authService.handleHttpError(error);
            }
          );
        } else {
          window.location.reload();
        }
      },
      (rejected) => {}
    );
  }

  openEnableDisableModal(id: string, title: string, isActive: boolean) {
    let res;
    if (isActive) {
      res = confirm(`Are you sure you want to disable ${title} ?`);
    } else {
      res = confirm(`Are you sure you want to enable ${title} ?`);
    }
    if (res) {
      this.adsService.changeStatus(id, !isActive).subscribe(
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

  openNewAdModal() {
    const modalRef = this.modalService.open(CreateAdModalComponent, {
      size: 'lg',
    });
    modalRef.result.then((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
