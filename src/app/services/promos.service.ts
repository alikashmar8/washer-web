import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import {
  promosEndpoint
} from 'src/constants/api-constants';
import { Promo } from 'src/models/promo.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PromosService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
      fromDate?: string;
      toDate?: string;
    }
  ): Promise<{
    count: number;
    data: Promo[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(promosEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Promo[] }) => {
      console.log(value);
      return value;
    });
  }

  async getById(id: string): Promise<Promo> {
    return await firstValueFrom(
      this.http.get(promosEndpoint + id, {
        headers: getHeaders(),
      })
    ).then((value: Promo) => {
      console.log(value);
      return value;
    });
  }

  create(data: {
    userId: String;
    code: String;
    discountAmount?: number;
    discountPercentage?: number;
    expiryDate?: Date;
    limit?: number;
    isActive: boolean;
  }) {
    return this.http.post(promosEndpoint, data, { headers: getHeaders() });
  }
}
