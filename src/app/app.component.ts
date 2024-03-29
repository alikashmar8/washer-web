import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticated: boolean = false;
  isLoading: boolean;
  constructor(
    private authService: AuthService,
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadingService.status.subscribe((val: boolean) => {
      this.isLoading = val;
    });
    this.loadingService.display(false)
  }
  title = 'washer-web';
}
