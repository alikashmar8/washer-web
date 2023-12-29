import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { loadingGifUrl } from 'src/constants/constants';
import { Employee } from 'src/models/employee.model';
import { Category } from '../../../../models/category.model';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class CreateProductsComponent implements OnInit {
  isLoading: boolean = true;
  currentEmployee: Employee | null = null;
  form: any;
  categories: Category[] = [];
  isStoreLoading: boolean = false;
  file: any;
  loadingGif: string = loadingGifUrl;
  uploadedImages = [];

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = this.loadingService.display(true);
      this.isStoreLoading = false;
      this.authService.isAdmin()
        ? (this.currentEmployee = this.authService.currentEmployee)
        : this.router.navigate(['/']);

      this.createForm();
      let res = await this.categoriesService.getAll(99, 0);
      this.categories = res.data;
      this.isLoading = this.loadingService.display(false);
    } catch (err) {
      console.log(err);

      this.authService.handleHttpError(err);
    }
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      images: [null, Validators.required],
      title: [null, Validators.required],
      description: [null],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      categoryId: [null, Validators.required],
      // quantity: [null, Validators.required],
    });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadMultiImage(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedImages.push(event.target.files[i]);
    }
  }

  store() {
    this.isStoreLoading = true;
    this.alertService.clear();
    if (this.form.invalid) {
      this.isStoreLoading = false;
      this.alertService.error('Check all values before submitting');
      return;
    }

    let data = new FormData();

    for (var i = 0; i < this.uploadedImages.length; i++) {
      data.append(
        'images[]',
        this.uploadedImages[i],
        this.uploadedImages[i].name
      );
    }
    data.append('title', this.form.value.title);
    data.append('description', this.form.value.description);
    data.append('price', this.form.value.price);
    data.append('quantity', this.form.value.quantity);
    data.append('categoryId', this.form.value.categoryId);

    this.productsService.store(data).subscribe(
      (res) => {
        this.isStoreLoading = false;
        console.log(res);
        this.alertService.toastSuccess('Product Created Successfully');
        this.router.navigate(['products'])
        this.form.reset();
      },
      (error) => {
        this.isStoreLoading = false;
        console.log(error);
        this.authService.handleHttpError(error);
      }
    );
  }
}
