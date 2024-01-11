import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import { getFormDataHeaders, getHeaders } from 'src/common/utils/functions';
import { employeesEndpoint } from 'src/constants/api-constants';
import { Employee } from 'src/models/employee.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
      branchId?: string;
      role?: EmployeeRole;
      isActive?: boolean;
    }
  ): Promise<{
    count: number;
    data: Employee[];
  }> {
    let query = '';
    for (var key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        var val = filters[key];
        query += '&' + key + '=' + val;
      }
    }

    return await firstValueFrom(
      this.http.get(employeesEndpoint + `?take=${take}&skip=${skip}${query}`, {
        headers: getHeaders(),
      })
    ).then((value: { count: number; data: Employee[] }) => {
      console.log(`Result: ` + value);
      return value;
    });
  }
  store(data) {
    return this.http.post(employeesEndpoint, data, {
      headers: getFormDataHeaders(),
    });
  }

  delete(employeeId: string) {
    return this.http.delete(`${employeesEndpoint}${employeeId}`, {
      headers: getHeaders(),
    });
  }
}
