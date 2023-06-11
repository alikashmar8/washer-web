import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css'],
})
export class ProductDetailsModalComponent implements OnInit {
  @Input() product: Product;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (!this.product) this.activeModal.dismiss();
  }
}
