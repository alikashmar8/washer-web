import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PaymentType } from 'src/common/enums/payment-type.enum';
import { RequestStatus } from 'src/common/enums/request-status.enum';
import { getHeaders } from 'src/common/utils/functions';
import { serviceRequestsEndpoint } from 'src/constants/api-constants';
import { ServiceRequest } from 'src/models/service-request.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getAll(
    take: number,
    skip: number,
    filters?: {
      search?: string;
      branchId?: string;
      isPaid?: boolean;
      status?: RequestStatus;
      fromDate?: string;
      toDate?: string;
      paymentType?: PaymentType;
      serviceTypeId?: string;
      ServiceRequestId?: string;
    }
  ): Promise<{
    count: number;
    data: ServiceRequest[];
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
        serviceRequestsEndpoint + `?take=${take}&skip=${skip}${query}`,
        {
          headers: getHeaders(),
        }
      )
    ).then((value: { count: number; data: ServiceRequest[] }) => {
      console.log(value);
      return value;
    });
  }

  changeStatus(id: string, status: RequestStatus, confirmedDate?: Date) {
    return this.http.patch(
      serviceRequestsEndpoint + id + '/status',
      { status, confirmedDate },
      { headers: getHeaders() }
    );
  }

  updatePaymentStatus(id: string, isPaid: boolean) {
    return this.http.patch(
      serviceRequestsEndpoint + id + '/payment-status',
      { isPaid },
      { headers: getHeaders() }
    );
  }

  async getById(serviceRequestId: string): Promise<ServiceRequest> {
    return await firstValueFrom(
      this.http.get(serviceRequestsEndpoint + serviceRequestId, {
        headers: getHeaders(),
      })
    ).then((value: ServiceRequest) => {
      console.log(value);
      return value;
    });
  }

  assignEmployee(requestId: string, employeeId: any) {
    return this.http.patch(
      serviceRequestsEndpoint + requestId + '/assign-employee',
      {
        employeeId,
      },
      { headers: getHeaders() }
    );
  }

  update(serviceRequestId: string, data: { confirmedDate?: string }) {
    return this.http.patch(serviceRequestsEndpoint + serviceRequestId, data, {
      headers: getHeaders(),
    });
  }
}
