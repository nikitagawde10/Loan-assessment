import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from './redux/user.action';
import { User } from './redux/user.state';
import { mapResultToUser } from './utils/user.utils';
import { selectAllUsers } from './redux/user.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private store = inject(Store);

  getAllUsers(): Observable<User[]> {
    return this.store.select(selectAllUsers);
  }

  addUser(data: any): void {
    const newUser = mapResultToUser(data);
    this.store.dispatch(addUser({ user: newUser }));
  }

  updateUser(data: any): void {
    const updatedUser = mapResultToUser(data, data.id);
    this.store.dispatch(updateUser({ user: updatedUser }));
  }

  deleteUser(userId: string): void {
    this.store.dispatch(deleteUser({ deleteUserId: userId }));
  }
}
