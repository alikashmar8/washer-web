import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrdersComponent } from './pages/orders/orders.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import {
  ConfirmBoxConfigModule,
  DialogConfigModule,
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SelectPaginationModule } from 'ngx-select-pagination';
import { SafePipeModule } from 'safe-pipe';
import { getAccessToken } from 'src/common/utils/functions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListItemComponent } from './common/cards/employee-list-item/employee-list-item.component';
import { DynamicInputComponent } from './common/components/dynamic-input/dynamic-input.component';
import { AddressUpdateModalComponent } from './common/modals/address-update-modal/address-update-modal.component';
import { ChangeRequestStatusModalComponent } from './common/modals/change-request-status-modal/change-request-status-modal.component';
import { DeleteModalComponent } from './common/modals/delete-modal/delete-modal.component';
import { ListServiceTypesModal } from './common/modals/list-service-types-modal/list-service-types-modal.component';
import { NewBranchModalComponent } from './common/modals/new-branch-modal/new-branch-modal.component';
import { NewEmployeeModalComponent } from './common/modals/new-employee-modal/new-employee-modal.component';
import { NewPromoModal } from './common/modals/new-promo-modal/new-promo-modal.component';
import { NewServiceCategoryModalComponent } from './common/modals/new-service-category-modal/new-service-category-modal.component';
import { NewServiceTypeModalComponent } from './common/modals/new-service-type-modal/new-service-type-modal.component';
import { ProductDetailsModalComponent } from './common/modals/product-details-modal/product-details-modal.component';
import { ShowEmployeeModal } from './common/modals/show-employee-modal/show-employee-modal.component';
import { UpdateRequestStatusModal } from './common/modals/update-request-status-modal/update-request-status-modal.component';
import { UpdateSettingModal } from './common/modals/update-setting-modal/update-setting-modal.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { BranchDetailsComponent } from './pages/branches/branch-details/branch-details.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { CategoriesCreateComponent } from './pages/categories/categories-create/categories-create.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategoriesComponent } from './pages/categories/edit-categories/edit-categories.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AdminHomeComponent } from './pages/home/admin-home/admin-home.component';
import { BranchEmployeeHomeComponent } from './pages/home/branch-employee-home/branch-employee-home.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { CreateProductsComponent } from './pages/products/products-create/products-create.component';
import { ProductsEditComponent } from './pages/products/products-edit/products-edit.component';
import { ProductsComponent } from './pages/products/products.component';
import { PromosComponent } from './pages/promos/promos.component';
import { ServiceCategoriesComponent } from './pages/service-categories/service-categories.component';
import { ServiceRequestDetailsComponent } from './pages/service-requests/service-request-details/service-request-details.component';
import { ServiceRequestsComponent } from './pages/service-requests/service-requests.component';
import { ServiceTypesComponent } from './pages/service-types/service-types.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShowUserComponent } from './pages/users/show-user/show-user.component';
import { UsersComponent } from './pages/users/users.component';
import { LoadingService } from './services/loading.service';
import { AdsComponent } from './pages/ads/ads.component';
import { CreateAdModalComponent } from './common/modals/create-ad-modal/create-ad-modal.component';

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
    SettingsComponent,
    UpdateSettingModal,
    UpdateRequestStatusModal,
    BranchDetailsComponent,
    ServiceRequestDetailsComponent,
    PromosComponent,
    NewPromoModal,
    UsersComponent,
    ShowUserComponent,
    ListServiceTypesModal,
    CategoriesComponent,
    CategoriesCreateComponent,
    EditCategoriesComponent,
    ProductsComponent,
    ProductsEditComponent,
    CreateProductsComponent,
    OrdersComponent,
    DynamicInputComponent,
    AddressUpdateModalComponent,
    ProductDetailsModalComponent,
    AdsComponent,
    CreateAdModalComponent,
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
    SafePipeModule,
    SelectPaginationModule,
    QRCodeModule,
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
