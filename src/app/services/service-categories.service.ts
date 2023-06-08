import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { serviceCategoriesEndpoint } from 'src/constants/api-constants';
import { ServiceCategory } from 'src/models/service-category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceCategoriesService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: ServiceCategory[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(
        serviceCategoriesEndpoint + `?take=${take}&skip=${skip}${query}`,
        {
          headers: getHeaders(),
        }
      )
    ).then((value: { count: number; data: ServiceCategory[] }) => {
      console.log(`Result: ` + value);
      return value;
    });
  }

  store(data) {
    return this.http.post(serviceCategoriesEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  delete(branchId: string) {
    return this.http.delete(`${serviceCategoriesEndpoint}${branchId}`, {
      headers: getHeaders(),
    });
  }

  changeStatus(id: string, isActive: boolean) {
    return this.http.patch(
      serviceCategoriesEndpoint + id + '/status',
      { isActive },
      { headers: getHeaders() }
    );
  }

  update(id: string, data: any) {
    return this.http.patch(
      serviceCategoriesEndpoint + id,
      data,
      { headers: getFormDataHeaders() }
    );
  }
}
