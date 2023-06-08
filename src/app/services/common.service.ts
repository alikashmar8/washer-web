import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constants/api-constants';
import { getHeaders } from 'src/common/utils/functions';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {}

  async getConstants() {
    return await firstValueFrom(
      this.http.get(apiUrl+'constants', {
        headers: getHeaders(),
      })
    ).then((value: any) => {
      console.log(value);
      return value;
    });
  }
}
