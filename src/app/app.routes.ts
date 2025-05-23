// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomersComponent } from './loan-assessment/customers/customers.component';
import { UploadDocumentsComponent } from './loan-assessment/upload-documents/upload-documents.component';
import { WorkOrdersComponent } from './loan-assessment/work-orders/work-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: UserRolesComponent },
      { path: 'permissions', component: UserPermissionsComponent },
      { path: 'upload-documents', component: UploadDocumentsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'work-orders', component: WorkOrdersComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
