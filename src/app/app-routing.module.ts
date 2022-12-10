import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/guards/admin-guard.service';
import { AnonymousGuardService } from 'src/guards/anonymous-guard.service';
import { AuthGuardService } from 'src/guards/auth-guard.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { ServiceCategoriesComponent } from './pages/service-categories/service-categories.component';
import { ServiceTypesComponent } from './pages/service-types/service-types.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuardService],
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'service-categories',
    component: ServiceCategoriesComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'service-types',
    component: ServiceTypesComponent,
  canActivate: [AdminGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
