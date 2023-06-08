import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getHeaders } from 'src/common/utils/functions';
import { branchesEndpoint } from 'src/constants/api-constants';
import { CreateBranchDTO } from 'src/dtos/create-branch.dto';
import { Branch } from 'src/models/branch.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
    }
  ): Promise<{
    count: number;
    data: Branch[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(branchesEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Branch[] }) => {
      console.log(`Result: ` + value);
      return value;
    });
  }

  async getById(branchId: string): Promise<Branch> {
    return await firstValueFrom(
      this.http.get(branchesEndpoint + branchId, {
        headers: getHeaders(),
      })
    ).then((value: Branch) => {
      console.log(value);
      return value;
    });
  }

  store(data: CreateBranchDTO) {
    return this.http.post(branchesEndpoint, data, { headers: getHeaders() });
  }

  update(id: string, data: { description?: string, isActive?: any }) {
    return this.http.patch(branchesEndpoint + id, data, {
      headers: getHeaders(),
    });
  }

  delete(branchId: string) {
    return this.http.delete(`${branchesEndpoint}${branchId}`, {
      headers: getHeaders(),
    });
  }
}
