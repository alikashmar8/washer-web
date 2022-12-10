import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { serviceTypesEndpoint } from 'src/constants/api-constants';
import { ServiceType } from 'src/models/service-type.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: ServiceType[];
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
        serviceTypesEndpoint + `?take=${take}&skip=${skip}${query}`,
        {
          headers: getHeaders(),
        }
      )
    ).then((value: { count: number; data: ServiceType[] }) => {
      return value;
    });
  }

  store(data) {
    return this.http.post(serviceTypesEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  delete(branchId: string) {
    return this.http.delete(`${serviceTypesEndpoint}${branchId}`, {
      headers: getHeaders(),
    });
  }

  changeStatus(id: string, isActive: boolean) {
    return this.http.patch(
      serviceTypesEndpoint + id + '/status',
      { isActive },
      { headers: getHeaders() }
    );
  }
}
