import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { OrdersService } from 'src/app/services/orders.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { loadingGifUrl } from 'src/constants/constants';
import { Employee } from 'src/models/employee.model';
import { Order } from '../../../models/order.model';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { InputType } from 'src/common/enums/input-type.enum';
import { ShowOrderDetailsModalComponent } from 'src/app/common/modals/show-order-details-modal/show-order-details-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = false;
  filters: {
    search: string;
  } = {
    search: null,
  };
  orderToDeleteId: string;
  isDeleteLoading: boolean = false;
  loadingGifUrl: string = loadingGifUrl;
  take: number = 10;
  skip: number = 0;
  count: number = 0;
  totalPages: number;
  currentPage: number = 1;
  OrderStatus = OrderStatus;
  EmployeeRole = EmployeeRole;
  currentEmployee: Employee;

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private ngbModal: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = this.loadingService.display(true);
      this.currentEmployee = this.authService.currentEmployee;
      let res = await this.ordersService.getAll(this.take, this.skip, {});
      this.orders = res.data;
      this.count = res.count;
      this.totalPages = this.count > 0 ? Math.ceil(this.count / 10) : 1;
      this.isLoading = this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  async getPageRecords(page: number) {
    if (page == this.currentPage && page != 1) return;
    try {
      let result = await this.ordersService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.orders = [];
      this.orders = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  async openUpdateStatusModal(order: Order) {
    const res: OrderStatus = await this.alertService.dynamicInputDialog({
      value: order.status,
      inputType: InputType.SELECT,
      options: Object.values(OrderStatus).map((status) => {
        return {
          label: status,
          value: status,
        };
      }),
    });

    if (res && res != order.status) {
      this.ordersService.updateStatus(order.id, res).subscribe(
        (response) => {
          this.alertService.toastSuccess('Order status updated');
          order.status = res;
        },
        (exception) => {
          this.alertService.toastError('Error updating order status');
          this.authService.handleHttpError(exception);
        }
      );
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  openOrderDetailsModal(order) {
    const modalRef = this.ngbModal.open(ShowOrderDetailsModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.order = order;
  }
}
