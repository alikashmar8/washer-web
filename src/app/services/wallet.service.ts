import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import { usersEndpoint, walletsEndpoint } from 'src/constants/api-constants';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  update(
    id: string,
    data: {
      balance: number;
    }
  ) {
    return this.http.patch(walletsEndpoint + id, data, {
      headers: getHeaders(),
    });
  }
}
