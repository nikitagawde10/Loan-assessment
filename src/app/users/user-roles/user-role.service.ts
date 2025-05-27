import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUserRole, deleteRole } from './redux/roles.action';
import { Observable } from 'rxjs';
import { UserRole } from './redux/roles.state';
import { selectAllUserRoles } from './redux/roles.selectors';
import { ToastService } from '../shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private store = inject(Store);
  private toastService = inject(ToastService);
  constructor() {}

  selectAllUserRoles(): Observable<UserRole[]> {
    return this.store!.select(selectAllUserRoles);
  }
  async addUserRole(newRole: any): Promise<void> {
    this.store!.dispatch(addUserRole({ role: newRole }));
    this.toastService.displayMessage(
      `Role ${newRole.roleName} added successfully!`,
      'create'
    );
  }
  async deleteRole(roleName: string): Promise<void> {
    this.store!.dispatch(deleteRole({ roleName }));
    this.toastService.displayMessage(
      `Role ${roleName} deleted successfully!`,
      'delete'
    );
  }
}
