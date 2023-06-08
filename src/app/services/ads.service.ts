import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { adsEndpoint } from 'src/constants/api-constants';
import { Ad } from 'src/models/ad.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  constructor(private http: HttpClient) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: Ad[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(adsEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Ad[] }) => {
      return value;
    });
  }

  store(data) {
    return this.http.post(adsEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  delete(adId: string) {
    return this.http.delete(`${adsEndpoint}${adId}`, {
      headers: getHeaders(),
    });
  }

  changeStatus(id: string, isActive: boolean) {
    return this.http.patch(
      adsEndpoint + id,
      { isActive: isActive },
      { headers: getHeaders() }
    );
  }

  update(id: string, data: any) {
    return this.http.patch(adsEndpoint + id, data, {
      headers: getFormDataHeaders(),
    });
  }
}
