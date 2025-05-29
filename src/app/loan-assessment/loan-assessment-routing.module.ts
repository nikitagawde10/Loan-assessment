import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'upload-documents',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import('./upload-documents/upload-documents.component').then(
        (m) => m.UploadDocumentsComponent
      ),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'user', 'superadmin', 'hr'] },
    loadComponent: () => {
      return import('./customers/customers.component').then(
        (m) => m.CustomersComponent
      );
    },
  },
  {
    path: 'work-orders',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin', 'hr'] },
    loadComponent: () =>
      import('./work-orders/work-orders.component').then(
        (m) => m.WorkOrdersComponent
      ),
  },
  {
    path: 'rxjs',
    data: { roles: ['admin', 'superadmin', 'hr'] },
    loadComponent: () =>
      import('../rxjs/rxjs.component').then((m) => m.RxjsComponent),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanAssessmentRoutingModule {}
