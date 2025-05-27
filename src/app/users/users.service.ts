import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from './redux/user.action';
import { User } from './redux/user.state';
import { mapResultToUser } from './utils/user.utils';
import { selectAllUsers, selectUserById } from './redux/user.selectors';
import { Observable } from 'rxjs';
import { ToastService } from './shared/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private store = inject(Store);
  private toastService = inject(ToastService);

  getAllUsers(): Observable<User[]> {
    return this.store.select(selectAllUsers);
  }

  async addUser(data: any): Promise<void> {
    const newUser = mapResultToUser(data);
    this.store.dispatch(addUser({ user: newUser }));
    this.toastService.displayMessage(
      `User ${newUser.name} added successfully!`,
      'create'
    );
  }

  async updateUser(data: any): Promise<void> {
    const updatedUser = mapResultToUser(data, data.id);
    this.store.dispatch(updateUser({ user: updatedUser }));
    this.toastService.displayMessage(
      `User ${updatedUser.name} updated successfully!`,
      'update'
    );
  }

  async deleteUser(userId: string): Promise<void> {
    this.store.dispatch(deleteUser({ deleteUserId: userId }));
    this.toastService.displayMessage(
      `User with ID ${userId} deleted successfully!`,
      'delete'
    );
  }

  showUserProfile(userId: string): Observable<User | undefined> {
    console.log(`Navigating to user profile with ID: ${userId}`);
    return this.store.select(selectUserById(userId));
  }
}
