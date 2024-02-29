import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { loadingGifUrl } from 'src/constants/constants';
import { Category } from 'src/models/category.model';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = true;
  isDeleteLoading: boolean = false;
  loadingGifUrl: string = loadingGifUrl;
  categoryId: string | undefined = '';
  take: number = 100;
  skip: number = 0;
  currentEmployee: Employee;
  EmployeeRole = EmployeeRole;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private categoriesService: CategoriesService,
    private modalService: NgbModal,
    private router: Router
  ) {
    // if (!this.authService.isAdmin()) {
    //   this.router.navigate(['/']).then(() => {});
    // }
  }

  open(content: any, categoryId?: string) {
    this.modalService.open(content, { windowClass: 'modal-global' });
    this.categoryId = categoryId;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true;
      this.currentEmployee = this.authService.currentEmployee;
      var res = await this.categoriesService.getAll(this.take, this.skip);
      this.categories = res.data;
      this.isLoading = false;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  delete() {
    this.isDeleteLoading = true;

    this.categoriesService.delete(this.categoryId).subscribe(
      (res) => {
        console.log(res);
        this.isDeleteLoading = false;
        window.location.reload();
      },
      (exception) => {
        console.log(exception);
        this.alertService.error('Error deleting category');
        this.isDeleteLoading = false;
      }
    );
  }
}
