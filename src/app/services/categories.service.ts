import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { categoriesEndpoint } from 'src/constants/api-constants';
import { Category } from 'src/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: Category[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(categoriesEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Category[] }) => {
      console.log(`Result: ` + value);
      return value;
    });
  }

  store(data) {
    return this.http.post(categoriesEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  async getById(categoryId: string): Promise<Category> {
    return await firstValueFrom(
      this.http.get(categoriesEndpoint + categoryId, {
        headers: getHeaders(),
      })
    ).then((value: Category) => {
      console.log(value);
      return value;
    });
  }

  update(categoryId: string, data: { name?: string; isActive?: boolean }) {
    return this.http.patch(categoriesEndpoint + categoryId, data, {
      headers: getHeaders(),
    });
  }

  delete(categoryId: string) {
    return this.http.delete(categoriesEndpoint + categoryId, {
      headers: getHeaders(),
    });
  }
}
