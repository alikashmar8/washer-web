import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { productsEndpoint } from 'src/constants/api-constants';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: Product[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(productsEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Product[] }) => {
      console.log(`Result: ` + value);
      return value;
    });
  }

  store(data) {
    return this.http.post(productsEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  async getById(categoryId: string): Promise<Product> {
    return await firstValueFrom(
      this.http.get(productsEndpoint + categoryId, {
        headers: getHeaders(),
      })
    ).then((value: Product) => {
      console.log(value);
      return value;
    });
  }

  update(productId: string, data: any) {
    return this.http.patch(productsEndpoint + productId, data, {
      headers: getFormDataHeaders(),
    });
  }

  delete(productId: string) {
    return this.http.delete(productsEndpoint + productId, {
      headers: getHeaders(),
    });
  }
}
