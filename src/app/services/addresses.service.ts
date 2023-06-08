import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import { addressesEndpoint } from 'src/constants/api-constants';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  async getById(addressId: string): Promise<Address> {
    return await firstValueFrom(
      this.http.get(addressesEndpoint + addressId, {
        headers: getHeaders(),
      })
    ).then((value: Address) => {
      console.log(value);
      return value;
    });
  }

  update(
    addressId: string,
    address: {
      description: string;
      city: string;
      region: string;
      street: string;
      building: string;
      lat?: number;
      lon?: number;
    }
  ) {
    return this.http.patch(addressesEndpoint + addressId, address, {
      headers: getHeaders(),
    });
  }
}
