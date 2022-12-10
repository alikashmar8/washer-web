import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/common/modals/delete-modal/delete-modal.component';
import { NewBranchModalComponent } from 'src/app/common/modals/new-branch-modal/new-branch-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Branch } from 'src/models/branch.model';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  currentEmployee: Employee;
  branches: Branch[] = [];
  count: number;
  search: string;
  currentPage: number = 1;
  take: number = 10;
  totalPages: number = 1;

  filters: {
    search: string;
  } = {
    search: null,
  };

  constructor(
    private branchesService: BranchesService,
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
      let res = await this.branchesService.getAll(10, 0);
      this.branches = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openNewBranchModal() {
    const modalRef = this.modalService.open(NewBranchModalComponent, {
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
      let result = await this.branchesService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.branches = [];
      this.branches = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  openDeleteModal(branchId: string, branchName: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.name = branchName;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.branchesService.delete(branchId).subscribe(
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

}
