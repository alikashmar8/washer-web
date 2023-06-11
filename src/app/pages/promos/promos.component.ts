import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPromoModal } from 'src/app/common/modals/new-promo-modal/new-promo-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PromosService } from 'src/app/services/promos.service';
import { Employee } from 'src/models/employee.model';
import { Promo } from 'src/models/promo.model';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {
  currentEmployee: Employee;
  promos: Promo[] = [];
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
    private promosService: PromosService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal,
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      let res = await this.promosService.getAll(10, 0);
      console.log("res")
      console.log(res)
      this.promos = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.loadingService.display(false);
    }
  }

  openNewPromoModal() {
    const modalRef = this.modalService.open(NewPromoModal, {
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
      let result = await this.promosService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.promos = [];
      this.promos = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }
}
