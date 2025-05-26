import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import('./user-roles/user-roles.component').then(
        (m) => m.UserRolesComponent
      ),
  },
  {
    path: 'permissions',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () =>
      import('./user-permissions/user-permissions.component').then(
        (m) => m.UserPermissionsComponent
      ),
  },
  {
    path: 'user-profile/:id',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
