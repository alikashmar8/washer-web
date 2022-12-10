import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceCategoriesService } from 'src/app/services/service-categories.service';
import { loadingGifUrl } from 'src/constants/constants';
import { CreateServiceCategoryDto } from 'src/dtos/create-service-category-dto';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-new-service-category-modal',
  templateUrl: './new-service-category-modal.component.html',
  styleUrls: ['./new-service-category-modal.component.css'],
})
export class NewServiceCategoryModalComponent implements OnInit {
  currentEmployee: Employee;
  category: CreateServiceCategoryDto = {
    name: null,
    isActive: true,
    icon: null,
  };
  file: any;

  count: number;

  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private serviceCategoriesService: ServiceCategoriesService,
    public activeModal: NgbActiveModal
  ) {
    this.currentEmployee = authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {}

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  store() {
    this.isStoreLoading = true;
    if (!this.category.name) {
      this.alertService.toastError('Service category name should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.file) {
      this.alertService.toastError('Service category icon should not be empty');
      this.isStoreLoading = false;
      return;
    }

    let data = new FormData();
    data.append('name', this.category.name);
    data.append('isActive', this.category.isActive + '');
    data.append('icon', this.file, this.file.name);

    this.serviceCategoriesService.store(data).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.toastSuccess('Service Category Added Successfully');
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
