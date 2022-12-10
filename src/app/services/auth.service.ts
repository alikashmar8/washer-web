import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { EmployeeRole } from 'src/common/enums/employee-role.enum';
import {
  generateRandomText,
  getAccessToken,
  getHeaders
} from 'src/common/utils/functions';
import {
  apiUrl,
  employeesLoginEndpoint,
  employeesLogoutEndpoint
} from 'src/constants/api-constants';
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
    return this.http
      .post<any>(employeesLoginEndpoint, {
        ...data,
        fcmToken: generateRandomText(49),
      })
      .pipe(
        map((employee) => {
          localStorage.setItem(
            'currentEmployee',
            JSON.stringify(employee.employee)
          );
          localStorage.setItem('access_token', employee.access_token);
          this.currentEmployeeSubject.next(employee);
          return Employee;
        })
      );
  }

  async logout() {
    // try {
    //   await firstValueFrom(
    //     this.http.post(
    //       employeesLogoutEndpoint,
    //       {
    //         jwtToken: getAccessToken(),
    //       },
    //       { headers: getHeaders() }
    //     )
    //   );
    // } catch (e) {
    //   this.alertService.error('An error occurred, please try again later!');
    //   return false;
    // }
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
    const exists: boolean = !!this.currentEmployee;
    const token = localStorage.getItem('access_token');
    if (!token || !exists) return false;
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

  isAdmin(): boolean {
    return (
      this.isAuthenticated() && this.currentEmployee.role == EmployeeRole.ADMIN
    );
  }
}
