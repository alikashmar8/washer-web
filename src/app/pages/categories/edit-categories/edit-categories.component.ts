import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadingGifUrl } from 'src/constants/constants';
import { Category } from '../../../../models/category.model';
import { User } from '../../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { LoadingService } from './../../../services/loading.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
})
export class EditCategoriesComponent implements OnInit {
  currentUser: User | null;
  category: Category;
  categoryId: string;
  isLoading: boolean;
  isEditLoading: boolean;
  loadingGif: string = loadingGifUrl;
  file: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private categoriesService: CategoriesService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = this.loadingService.display(true);
      this.categoryId = this.route.snapshot.paramMap.get('id') || '';
      if (!this.categoryId) this.router.navigate(['/']);
      this.category = await this.categoriesService.getById(this.categoryId);
      this.isLoading = this.loadingService.display(false);
    } catch (e) {
      this.authService.handleHttpError(e);
    }
  }

  update() {
    this.isEditLoading = true;
    this.alertService.clear();
    if (!this.category.name) {
      this.alertService.error('Name field should not be empty');
      this.isEditLoading = false;
      return;
    }

    this.categoriesService
      .update(this.categoryId, {
        name: this.category.name,
        isActive: this.category.isActive,
      })
      .subscribe(
        (res: any) => {
          this.isEditLoading = false;
          this.alertService.toastSuccess('Category updated successfully');
          this.router.navigate(['categories'])
        },
        (error) => {
          console.log(error);
          this.authService.handleHttpError(error);
        }
      );
  }
}
