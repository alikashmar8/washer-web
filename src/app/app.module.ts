import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import {
  ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { getAccessToken } from 'src/common/utils/functions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListItemComponent } from './common/cards/employee-list-item/employee-list-item.component';
import { DeleteModalComponent } from './common/modals/delete-modal/delete-modal.component';
import { ShowEmployeeModal } from './common/modals/show-employee-modal/show-employee-modal.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AdminHomeComponent } from './pages/home/admin-home/admin-home.component';
import { BranchEmployeeHomeComponent } from './pages/home/branch-employee-home/branch-employee-home.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoadingService } from './services/loading.service';
import { NewEmployeeModalComponent } from './common/modals/new-employee-modal/new-employee-modal.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { NewBranchModalComponent } from './common/modals/new-branch-modal/new-branch-modal.component';
import { ServiceCategoriesComponent } from './pages/service-categories/service-categories.component';
import { NewServiceCategoryModalComponent } from './common/modals/new-service-category-modal/new-service-category-modal.component';
import { ServiceTypesComponent } from './pages/service-types/service-types.component';
import { NewServiceTypeModalComponent } from './common/modals/new-service-type-modal/new-service-type-modal.component';
import { ServiceRequestsComponent } from './pages/service-requests/service-requests.component';
import { ChangeRequestStatusModalComponent } from './common/modals/change-request-status-modal/change-request-status-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HomeComponent,
    AdminHomeComponent,
    BranchEmployeeHomeComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeListItemComponent,
    DeleteModalComponent,
    ShowEmployeeModal,
    NewEmployeeModalComponent,
    BranchesComponent,
    NewBranchModalComponent,
    ServiceCategoriesComponent,
    NewServiceCategoryModalComponent,
    ServiceTypesComponent,
    NewServiceTypeModalComponent,
    ServiceRequestsComponent,
    ChangeRequestStatusModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAccessToken,
        allowedDomains: ['*'],
        disallowedRoutes: [],
      },
    }),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    Ng2SearchPipeModule,
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
