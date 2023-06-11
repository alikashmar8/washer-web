import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsModalComponent } from 'src/app/common/modals/product-details-modal/product-details-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { mediaRoot } from 'src/constants/api-constants';
import { Employee } from 'src/models/employee.model';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = true;
  products: Product[] = [];
  search: string = '';
  take: number = 10;
  skip: number = 0;
  filters = {
    search: '',
  };
  currentPage: number = 1;
  count: number = 0;
  totalPages: number = 1;
  currentEmployee: Employee;
  EmployeeRole = EmployeeRole;
  isDeleteLoading: boolean = false;
  mediaRoot = mediaRoot;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    this.currentEmployee = this.authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = this.loadingService.display(true);
      let res = await this.productsService.getAll(this.take, this.skip);
      this.products = res.data;
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
      let result = await this.productsService.getAll(
        this.take,
        (page - 1) * this.take,
        this.filters
      );
      this.products = [];
      this.products = result.data;
      this.count = result.count;
      this.totalPages = result.count > 0 ? Math.ceil(result.count / 10) : 1;
      this.currentPage = page;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  // open(content: any, product?: string) {
  //   this.modalService.open(content, { windowClass: 'modal-global' });
  //   // this.productId = categoryId;
  // }

  counter(i: number) {
    return new Array(i);
  }

  deleteProduct(productId: string) {
    console.log('deleting..');

    this.isDeleteLoading = true;
    const res = confirm('Are you sure you want to delete this product?');
    if (res) {
      this.productsService.delete(productId).subscribe(
        (res) => {
          console.log(res);
          this.isDeleteLoading = false;
          window.location.reload();
          this.alertService.toastSuccess('Product deleted successfully');
        },
        (exception) => {
          console.log(exception);
          this.alertService.error('Error deleting category');
        }
      );
    }
  }

  changeImage(mainImageId, image) {
    var imageContainer: any = document.getElementById(mainImageId);
    imageContainer.src = image.src;
  }

  showProductDetails(product: Product) {
    const modalRef = this.modalService.open(ProductDetailsModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
  }
}
