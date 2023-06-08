import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import { usersEndpoint } from 'src/constants/api-constants';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search: string;
    }
  ): Promise<{
    count: number;
    data: User[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(usersEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: User[] }) => {
      console.log(value);
      return value;
    });
  }

  async getById(id: string): Promise<User> {
    return await firstValueFrom(
      this.http.get(usersEndpoint + id, {
        headers: getHeaders(),
      })
    ).then((value: User) => {
      console.log(value);
      return value;
    });
  }
}
