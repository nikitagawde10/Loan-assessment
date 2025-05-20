// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomersComponent } from './loan-assessment/customers/customers.component';
import { UploadDocumentsComponent } from './loan-assessment/upload-documents/upload-documents.component';
import { WorkOrdersComponent } from './loan-assessment/work-orders/work-orders.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeNavComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: UserRolesComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
  {
    path: 'permissions',
    component: UserPermissionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upload-documents',
    component: UploadDocumentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'work-orders',
    component: WorkOrdersComponent,
    canActivate: [AuthGuard],
  },
];
