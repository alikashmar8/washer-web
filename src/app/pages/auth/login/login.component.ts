import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  key: string;
  password: string;
  isLoadingLogin: boolean = false;
  loadingGif = 'https://i.gifer.com/VZvw.gif';
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    this.isLoadingLogin = true;
    if (!this.key || !this.password) {
      this.alertService.toastError('Please fill all required fields!');
      this.isLoadingLogin = false;
      return;
    }
    debugger;

    this.authService
      .employeeLogin({
        email: this.key,
        username: this.key,
        phoneNumber: this.key,
        password: this.password,
      })
      .subscribe(
        (res: any) => {
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
          this.isLoadingLogin = false;
        },
        (err) => {
          this.authService.handleHttpError(err);
          this.isLoadingLogin = false;
        }
      );
  }
}
