import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PromosService } from 'src/app/services/promos.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-new-promo-modal',
  templateUrl: './new-promo-modal.component.html',
  styleUrls: ['./new-promo-modal.component.css'],
})
export class NewPromoModal implements OnInit {
  @Input() userId;
  isStoreLoading: boolean = false;
  isLoading: boolean = true;
  users: User[] = [];
  totalUsersPages: number = 0;
  usersPage: number = 1;
  totalUsersCount: number = 1;

  promo: {
    userId: String;
    code: String;
    discountAmount?: number;
    discountPercentage?: number;
    expiryDate?: Date;
    limit?: number;
    isActive: boolean;
  } = {
    userId: '',
    code: '',
    discountAmount: null,
    discountPercentage: null,
    expiryDate: null,
    limit: null,
    isActive: true,
  };

  constructor(
    private usersService: UsersService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private alertService: AlertService,
    private promosService: PromosService,
    public activeModal: NgbActiveModal
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = this.loadingService.display(true);
      if (this.userId) this.promo.userId = this.userId;
      let res = await this.usersService.getAll(10, 0);
      this.users = res.data;
      this.totalUsersCount = res.count;
      this.totalUsersPages =
        this.totalUsersCount > 0 ? Math.ceil(this.totalUsersCount / 10) : 1;
      this.isLoading = this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
      this.isLoading = this.loadingService.display(false);
    }
  }
  store() {
    this.loadingService.display(true);
    if (!this.promo.userId) {
      this.alertService.toastError('Please select a customer!');
      this.loadingService.display(false);
      return;
    }
    if (!this.promo.code) {
      this.alertService.toastError('Please enter a promo code!');
      this.loadingService.display(false);
      return;
    }
    if (!this.promo.discountAmount && !this.promo.discountPercentage) {
      this.alertService.toastError(
        'Please enter a discount amount or percentage!'
      );
      this.loadingService.display(false);
      return;
    }
    if (this.promo.discountAmount && this.promo.discountPercentage) {
      this.alertService.toastError(
        'Either discount amount or discount percentage should be provided!'
      );
      this.loadingService.display(false);
      return;
    }

    if (this.promo.expiryDate && this.promo.expiryDate < new Date()) {
      this.alertService.toastError('Please enter a valid date !');
      this.loadingService.display(false);
      return;
    }

    if (!this.promo.limit || this.promo.limit < 1) {
      this.alertService.toastError('Please enter a valid limit number!');
      this.loadingService.display(false);
      return;
    }

    this.promosService.create(this.promo).subscribe(
      (res) => {
        this.alertService.toastSuccess('Promo added successfully');
        this.activeModal.close();
        this.loadingService.display(false);
        window.location.reload();
      },
      (err) => {
        this.authService.handleHttpError(err);
        this.loadingService.display(false);
      }
    );
  }
}
