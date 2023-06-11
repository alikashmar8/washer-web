import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { loadingGifUrl } from 'src/constants/constants';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css'],
})
export class CategoriesCreateComponent implements OnInit {
  isLoading: boolean = true;
  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;
  currentUser: User | null = null;
  name: string = '';
  isActive: boolean = false;


  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }


  store() {
    this.isStoreLoading = true;
    this.alertService.clear();
    if (!this.name) {
      this.alertService.toastError('Name field should not be empty');
      this.isStoreLoading = false;
      return;
    }

    this.categoriesService.store({
      name: this.name,
      isActive: this.isActive
    }).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
        this.alertService.toastSuccess('Category Added Successfully');
        this.isStoreLoading = false;

      },
      error: (error) => {
        console.log(error);
        this.authService.handleHttpError(error);
        this.isStoreLoading = false;
      },
    });
  }
}
