import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceCategoriesService } from 'src/app/services/service-categories.service';
import { ServiceTypesService } from 'src/app/services/service-types.service';
import { Currency } from 'src/common/enums/currency.enum';
import { loadingGifUrl } from 'src/constants/constants';
import { CreateServiceTypeDto } from 'src/dtos/create-service-type.dto';
import { Employee } from 'src/models/employee.model';
import { ServiceCategory } from 'src/models/service-category.model';

@Component({
  selector: 'app-new-service-type-modal',
  templateUrl: './new-service-type-modal.component.html',
  styleUrls: ['./new-service-type-modal.component.css'],
})
export class NewServiceTypeModalComponent implements OnInit {
  currentEmployee: Employee;
  type: CreateServiceTypeDto = {
    name: null,
    categoryId: null,
    price: 0,
    isActive: true,
    currency: Currency.USD,
    isMotoAllowed: false,
    showQuantityInput: true,
    showVehicleSelection: false,
    icon: null,
  };
  file: any;
  serviceCategories: ServiceCategory[] = [];
  count: number;

  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private serviceTypeService: ServiceTypesService,
    private serviceCategoriesService: ServiceCategoriesService,
    public activeModal: NgbActiveModal
  ) {
    this.currentEmployee = authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {
    try {
      let res = await this.serviceCategoriesService.getAll(99, 0);
      this.serviceCategories = res.data;
      this.count = res.count;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  store() {
    this.isStoreLoading = true;
    if (!this.type.name) {
      this.alertService.toastError('Service type name should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.type.categoryId) {
      this.alertService.toastError(
        'Service type category name should be selected'
      );
      this.isStoreLoading = false;
      return;
    }

    if (!this.type.price) {
      this.alertService.toastError('Service type price should not be empty!');
      this.isStoreLoading = false;
      return;
    }

    if (!this.file) {
      this.alertService.toastError('Service category icon should not be empty');
      this.isStoreLoading = false;
      return;
    }

    let data = new FormData();
    data.append('name', this.type.name);
    data.append('categoryId', this.type.categoryId);
    data.append('currency', this.type.currency);
    data.append('isMotoAllowed', this.type.isMotoAllowed + '');
    data.append('price', this.type.price + '');
    data.append('showQuantityInput', this.type.showQuantityInput + '');
    data.append('showVehicleSelection', this.type.showVehicleSelection + '');
    data.append('isActive', this.type.isActive + '');
    data.append('icon', this.file, this.file.name);

    this.serviceTypeService.store(data).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.toastSuccess('Service Type Added Successfully');
        this.isStoreLoading = false;
        this.activeModal.close(true);
      },
      error: (error) => {
        console.log(error);
        this.authService.handleHttpError(error);
        this.isStoreLoading = false;
      },
    });
  }
}
