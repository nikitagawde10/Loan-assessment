import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomersComponent } from './loan-assessment/customers/customers.component';
import { UploadDocumentsComponent } from './loan-assessment/upload-documents/upload-documents.component';
import { WorkOrdersComponent } from './loan-assessment/work-orders/work-orders.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessForbiddenComponent } from './access-forbidden/access-forbidden.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin', 'superadmin', 'hr'] },
  },
  { path: 'forbidden', component: AccessForbiddenComponent },
  {
    path: 'roles',
    component: UserRolesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
  },
  {
    path: 'permissions',
    component: UserPermissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
  },
  {
    path: 'upload-documents',
    component: UploadDocumentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'user', 'superadmin', 'hr'] },
  },
  {
    path: 'work-orders',
    component: WorkOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin', 'hr'] },
  },
  {
    path: 'user-profile/:id',
    loadComponent: () =>
      import('./users/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  // 🚫 Fallback for invalid routes
  { path: '**', component: PageNotFoundComponent },
];
