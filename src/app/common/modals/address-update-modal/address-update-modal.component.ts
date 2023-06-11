import { Component, Input, OnInit } from '@angular/core';
import { AddressesService } from 'src/app/services/addresses.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { loadingGifUrl } from 'src/constants/constants';
import { Address } from 'src/models/address.model';

@Component({
  selector: 'app-address-update-modal',
  templateUrl: './address-update-modal.component.html',
  styleUrls: ['./address-update-modal.component.css'],
})
export class AddressUpdateModalComponent implements OnInit {
  @Input() addressId: string;
  address: Address;
  loadingGif: string = loadingGifUrl;
  isLoading: boolean = false;
  isUpdateLoading: boolean = false;

  constructor(
    private addressesService: AddressesService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true;
      this.address = await this.addressesService.getById(this.addressId);
      this.isLoading = false;
    } catch (err) {
      this.authService.handleHttpError(err);
    }
  }

  update() {
    this.addressesService
      .update(this.addressId, {
        description: this.address.description,
        city: this.address.city,
        region: this.address.region,
        street: this.address.street,
        building: this.address.building,
        lat: this.address.lat,
        lon: this.address.lon,
      })
      .subscribe(
        (res) => {
          window.location.reload();
          this.alertService.toastSuccess('Update successful');
        },
        (err) => {
          this.authService.handleHttpError(err);
        }
      );
  }
}
