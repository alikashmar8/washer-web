import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { loadingGifUrl } from 'src/constants/constants';
import { Category } from 'src/models/category.model';
import { Product } from '../../../../models/product.model';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { mediaRoot } from './../../../../constants/api-constants';
import { Employee } from './../../../../models/employee.model';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  currentEmployee: Employee | null;
  isLoading: boolean;
  product: Product;
  productId: string;
  form: FormGroup;
  isUpdateLoading: boolean;
  isPhotoChanged: boolean = false;
  file: any;
  loadingGif: string = loadingGifUrl;
  mediaRoot: string = mediaRoot;

  categories: Category[] = [];
  categoryId: string;
  uploadedImages = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService
  ) {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']).then(() => {});
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      this.currentEmployee = this.authService.currentEmployee;
      this.isLoading = this.loadingService.display(true);
      this.createForm();
      this.productId = this.route.snapshot.paramMap.get('id') || '';
      if (!this.productId) this.router.navigate(['/']);
      this.product = await this.productsService.getById(this.productId);
      this.categoryId = this.product.categoryId;
      let res = await this.categoriesService.getAll(99, 0);
      this.categories = res.data;
      this.isLoading = this.loadingService.display(false);
    } catch (error) {
      console.log(error);
      this.authService.handleHttpError(error);
      this.isLoading = this.loadingService.display(false);
    }
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      images: [null],
    });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    this.isPhotoChanged = true;
    console.log(this.file);
  }

  uploadMultiImage(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedImages.push(event.target.files[i]);
    }
    this.isPhotoChanged = true;
  }

  update() {
    this.isUpdateLoading = true;
    this.alertService.clear();

    if (
      this.form.invalid ||
      !this.product.title ||
      !this.product.price ||
      !this.product.categoryId
    ) {
      this.isUpdateLoading = false;
      this.alertService.error('Check all values before submitting');
      return;
    }
    let data;
    if (this.isPhotoChanged) {
      data = new FormData();
      data.append('title', this.product.title);
      data.append('description', this.product.description);
      data.append('price', this.product.price + '');
      data.append('categoryId', this.product.categoryId + '');
      for (var i = 0; i < this.uploadedImages.length; i++) {
        data.append(
          'images[]',
          this.uploadedImages[i],
          this.uploadedImages[i].name
        );
      }
    } else {
      data = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price + '',
        categoryId: this.product.categoryId + '',
      };
    }

    this.productsService.update(this.productId, data).subscribe(
      (res: any) => {
        this.isUpdateLoading = false;
        console.log(res);
        this.product = res;
        this.alertService.toastSuccess('Product Updated Successfully');
        this.form.reset('image');
        this.router.navigate(['products'])
      },
      (err) => {
        this.isUpdateLoading = false;
        console.log(err);
        this.authService.handleHttpError(err);
      }
    );
  }
}
