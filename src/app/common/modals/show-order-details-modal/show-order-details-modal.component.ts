import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/models/order.model';

@Component({
  selector: 'app-show-order-details-modal',
  templateUrl: './show-order-details-modal.component.html',
  styleUrls: ['./show-order-details-modal.component.css'],
})
export class ShowOrderDetailsModalComponent implements OnInit {
  @Input() order: Order;
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.order);
    if (!this.order) {
      this.alertService.toastError('Something went wrong');
      this.activeModal.dismiss();
    }
  }
}
