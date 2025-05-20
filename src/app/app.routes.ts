import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './loan-assessment/customers/customers.component';
import { UploadDocumentsComponent } from './loan-assessment/upload-documents/upload-documents.component';
import { WorkOrdersComponent } from './loan-assessment/work-orders/work-orders.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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
  {
    path: 'roles',
    component: UserRolesComponent,
  },
  { path: 'users', component: UsersComponent },
  { path: 'permissions', component: UserPermissionsComponent },
  { path: '**', component: PageNotFoundComponent },
];
