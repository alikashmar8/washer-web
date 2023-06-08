import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { ordersEndpoint } from 'src/constants/api-constants';
import { Order } from 'src/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: Order[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(ordersEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Order[] }) => {
      console.log(value);
      return value;
    });
  }

  store(data) {
    return this.http.post(ordersEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  async getById(categoryId: string): Promise<Order> {
    return await firstValueFrom(
      this.http.get(ordersEndpoint + categoryId, {
        headers: getHeaders(),
      })
    ).then((value: Order) => {
      console.log(value);
      return value;
    });
  }

  update(orderId: string, data: any) {
    return this.http.patch(ordersEndpoint + orderId, data, {
      headers: getHeaders(),
    });
  }

  updateStatus(orderId: any, status: any) {
    return this.http.patch(
      ordersEndpoint + orderId,
      {
        status,
      },
      {
        headers: getFormDataHeaders(),
      }
    );
  }
}
