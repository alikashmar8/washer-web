import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPromoModal } from 'src/app/common/modals/new-promo-modal/new-promo-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/models/user.model';
import { UsersService } from './../../../services/users.service';
import { mediaRoot } from 'src/constants/api-constants';
import { AlertService } from 'src/app/services/alert.service';
import { InputType } from 'src/common/enums/input-type.enum';
import { Wallet } from 'src/models/wallet.model';
import { WalletsService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  user: User;
  userId: string;
  mediaRoot: string = mediaRoot;

  constructor(
    private usersService: UsersService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private walletsService: WalletsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loadingService.display(true);
      this.userId = this.route.snapshot.paramMap.get('id');
      this.user = await this.usersService.getById(this.userId);
      this.loadingService.display(false);
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  openNewPromoModal() {
    const modalRef = this.modalService.open(NewPromoModal, {
      size: 'lg',
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.result.then((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  async openUpdateWalletAmountModal(amount: number) {
    const res: string = await this.alertService.dynamicInputDialog({
      value: amount,
      inputType: InputType.NUMBER,
      options: [],
    });

    if (res && Number(res) != amount) {
      this.walletsService
        .update(this.user.walletId, {
          balance: Number(res),
        })
        .subscribe(
          (response: Wallet) => {
            this.alertService.toastSuccess('Balance updated successfully');
            this.user.wallet.balance = response.balance;
          },
          (exception) => {
            this.alertService.toastError('Error updating balance');
            this.authService.handleHttpError(exception);
          }
        );
    }
  }
}
