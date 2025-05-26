import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin', 'superadmin', 'hr'] },
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./access-forbidden/access-forbidden.component').then(
        (m) => m.AccessForbiddenComponent
      ),
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import('./users/user-roles/user-roles.component').then(
        (m) => m.UserRolesComponent
      ),
  },
  {
    path: 'permissions',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import('./users/user-permissions/user-permissions.component').then(
        (m) => m.UserPermissionsComponent
      ),
  },
  {
    path: 'upload-documents',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import(
        './loan-assessment/upload-documents/upload-documents.component'
      ).then((m) => m.UploadDocumentsComponent),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'user', 'superadmin', 'hr'] },
    loadComponent: () => {
      return import('./loan-assessment/customers/customers.component').then(
        (m) => m.CustomersComponent
      );
    },
  },
  {
    path: 'work-orders',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin', 'hr'] },
    loadComponent: () =>
      import('./loan-assessment/work-orders/work-orders.component').then(
        (m) => m.WorkOrdersComponent
      ),
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
