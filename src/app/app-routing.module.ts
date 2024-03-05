import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/guards/admin-guard.service';
import { AnonymousGuardService } from 'src/guards/anonymous-guard.service';
import { AuthGuardService } from 'src/guards/auth-guard.service';
import { AdsComponent } from './pages/ads/ads.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { BranchDetailsComponent } from './pages/branches/branch-details/branch-details.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { CategoriesCreateComponent } from './pages/categories/categories-create/categories-create.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategoriesComponent } from './pages/categories/edit-categories/edit-categories.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CreateProductsComponent } from './pages/products/products-create/products-create.component';
import { ProductsEditComponent } from './pages/products/products-edit/products-edit.component';
import { ProductsComponent } from './pages/products/products.component';
import { PromosComponent } from './pages/promos/promos.component';
import { DeleteRequestComponent } from './pages/public/delete-request/delete-request.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { TermConditionsComponent } from './pages/public/term-conditions/term-conditions.component';
import { ServiceCategoriesComponent } from './pages/service-categories/service-categories.component';
import { ServiceRequestDetailsComponent } from './pages/service-requests/service-request-details/service-request-details.component';
import { ServiceRequestsComponent } from './pages/service-requests/service-requests.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShowUserComponent } from './pages/users/show-user/show-user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    children: [
      // {
      //   path: '',
      //   component: EmployeesComponent,
      //   canActivate: [AuthGuardService],
      // },
      {
        path: 'branches',
        component: BranchesComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'ads',
        component: AdsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'branches/:id',
        component: BranchDetailsComponent,
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
      // {
      //   path: 'service-types',
      //   component: ServiceTypesComponent,
      //   canActivate: [AdminGuardService],
      // },
      {
        path: 'service-requests',
        component: ServiceRequestsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'service-requests/:id',
        component: ServiceRequestDetailsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'users/:id',
        component: ShowUserComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'promos',
        component: PromosComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'categories/create',
        component: CategoriesCreateComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'categories/edit/:id',
        component: EditCategoriesComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'products/create',
        component: CreateProductsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'products/:id/edit',
        component: ProductsEditComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuardService],
  },
  {
    path: 'delete-request',
    component: DeleteRequestComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-conditions',
    component: TermConditionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
