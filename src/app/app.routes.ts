import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    data: { roles: ['user', 'admin', 'superadmin', 'hr'] },
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'loan-assessment',
    data: { roles: ['admin', 'superadmin', 'hr'] },
    loadChildren: () =>
      import('./loan-assessment/loan-assessment.module').then(
        (m) => m.LoanAssessmentModule
      ),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./access-forbidden/access-forbidden.component').then(
        (m) => m.AccessForbiddenComponent
      ),
  },
  // Fallback for invalid routes
  { path: '**', component: PageNotFoundComponent },
];
