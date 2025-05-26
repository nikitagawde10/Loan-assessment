import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUserRole, deleteRole } from './redux/roles.action';
import { Observable } from 'rxjs';
import { UserRole } from './redux/roles.state';
import { selectAllUserRoles } from './redux/roles.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private store = inject(Store);
  constructor() {}

  selectAllUserRoles(): Observable<UserRole[]> {
    return this.store.select(selectAllUserRoles);
  }
  addUserRole(newRole: any) {
    this.store.dispatch(addUserRole({ role: newRole }));
  }
  deleteRole(roleName: string) {
    this.store.dispatch(deleteRole({ roleName }));
  }
}
