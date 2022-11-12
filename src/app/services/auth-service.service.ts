import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getHeaders } from 'src/common/utils/functions';
import { apiUrl, employeesLoginEndpoint } from 'src/constants/api-constants';
import { Employee } from 'src/models/employee.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentEmployeeSubject: BehaviorSubject<Employee | null>;
  public currentEmployeeObservable: Observable<Employee | null>;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private alertService: AlertService,
    private router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    const s = localStorage.getItem('currentEmployee');
    if (s != null) {
      this.currentEmployeeSubject = new BehaviorSubject<Employee | null>(
        JSON.parse(s)
      );
    } else {
      this.currentEmployeeSubject = new BehaviorSubject<Employee | null>(null);
    }

    this.currentEmployeeObservable =
      this.currentEmployeeSubject?.asObservable();
  }

  public get currentEmployee(): Employee | null {
    return this.currentEmployeeSubject?.value;
  }

  employeeLogin(data: {
    email?: string;
    username?: string;
    phoneNumber?: string;
    password: string;
  }) {
    return this.http.post<any>(employeesLoginEndpoint, data).pipe(
      map((Employee) => {
        localStorage.setItem(
          'currentEmployee',
          JSON.stringify(Employee.Employee)
        );
        localStorage.setItem('access_token', Employee.access_token);
        this.currentEmployeeSubject.next(Employee);
        return Employee;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentEmployee');
    localStorage.removeItem('access_token');
    return true;
  }

  // register(data: {
  //   lastName: string;
  //   firstName: string;
  //   password: string;
  //   confirmPassword: string;
  //   role: number;
  //   email: string;
  // }) {
  //   return this.http.post(`${apiUrl}/auth/register`, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //   });
  // }

  // resetPasswordRequest(email: any) {
  //   const data: any = {};
  //   data.email = email;
  //   return this.http.post(`${apiUrl}/forgot`, data);
  // }

  // resetPassword(data: any, token: any) {
  //   const d: any = {};
  //   d.data = data;
  //   d.token = token;
  //   return this.http.post(`${apiUrl}/resetpassword`, d);
  // }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  handleHttpError(err: HttpErrorResponse) {
    switch (err.error.statusCode) {
      case 400:
        Array.isArray(err.error.message)
          ? err.error.message.forEach((message) => {
              this.alertService.toastNotification(
                message,
                DialogLayoutDisplay.DANGER
              );
            })
          : this.alertService.toastNotification(
              err.error.message,
              DialogLayoutDisplay.DANGER
            );
        break;
      case 404:
        let canGoBack =
          !!this.router.getCurrentNavigation()?.previousNavigation;
        if (canGoBack) {
          // We can safely go back to the previous location as
          // we know it's within our app.
          this.alertService.toastNotification(
            'Error 404 - not found',
            DialogLayoutDisplay.DANGER
          );
          this.location.back();
        } else {
          // There's no previous navigation.
          // Here we decide where to go. For example, let's say the
          // upper level is the index page, so we go up one level.
          this.alertService.toastNotification(
            'Error 404 - not found',
            DialogLayoutDisplay.DANGER
          );
          this.router.navigate(['..'], { relativeTo: this.route });
        }
        break;
      case 403 || 401:
        //not authorized
        this.logout();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        break;

      default:
        break;
    }
  }

  async updatePassword(
    id,
    data: { oldPassword: string; newPassword: string; confirmPassword: string }
  ) {
    return await this.http
      .patch<any>(`${apiUrl}auth/${id}/update-password`, data, {
        headers: getHeaders(),
      })
      .toPromise();
  }
}
