// src/app/users/users.routes.ts
import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';

export const userRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'home', component: HomeNavComponent },
  { path: 'roles', component: UserRolesComponent },
  { path: 'permissions', component: UserPermissionsComponent },
];
