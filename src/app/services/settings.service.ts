import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import { settingsEndpoint } from 'src/constants/api-constants';
import { Setting } from 'src/models/setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor(private http: HttpClient) {}

  async getAll(): Promise<Setting[]> {
    return await firstValueFrom(
      this.http.get(settingsEndpoint, {
        headers: getHeaders(),
      })
    ).then((value: Setting[]) => {
      return value;
    });
  }

  update(id: string, data: { value: string }) {
    return this.http.put(settingsEndpoint + id, data, {
      headers: getHeaders(),
    });
  }
}
