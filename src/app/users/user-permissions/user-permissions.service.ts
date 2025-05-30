import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAllPermissions,
  selectAllUserPermissions,
} from './redux/permissions.selectors';
import { addCustomPermission } from './redux/permissions.action';
import { Permission, UserPermission } from './redux/permissions.state';

@Injectable({ providedIn: 'root' })
export class UserPermissionsService {
  private store = inject(Store);

  getAllPermissions(): Observable<Permission[]> {
    return this.store.select(selectAllPermissions);
  }
  getAllUserPermissions(): Observable<UserPermission[]> {
    return this.store.select(selectAllUserPermissions);
  }

  updateUserPermissions(userId: string, perms: Permission[]): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.store.dispatch(
            addCustomPermission({
              userId,
              permissionIds: perms.map((p) => p.id),
            })
          );
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 500);
    });
  }
}
