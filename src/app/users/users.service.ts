import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from './redux/user.action';
import { User } from './redux/user.state';
import { mapResultToUser } from './utils/user.utils';
import { selectAllUsers, selectUserById } from './redux/user.selectors';
import { Observable } from 'rxjs';
import { ToastService } from './shared/toast/toast.service';
import { DialogService } from './shared/dialog/dialog.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private store = inject(Store);
  private toastService = inject(ToastService);
  private dialogService = inject(DialogService);
  getAllUsers(): Observable<User[]> {
    return this.store.select(selectAllUsers);
  }

  async addUser(data: any): Promise<void> {
    const newUser = mapResultToUser(data);
    this.store.dispatch(addUser({ user: newUser }));
    await this.toastService.displayMessage(
      `User ${newUser.name} added successfully!`,
      'create'
    );
  }

  async updateUser(data: any): Promise<void> {
    const updatedUser = mapResultToUser(data, data.id);
    this.store.dispatch(updateUser({ user: updatedUser }));
    await this.toastService.displayMessage(
      `User ${updatedUser.name} updated successfully!`,
      'update'
    );
  }

  async deleteUser(userId: string): Promise<void> {
    const confirmed = await this.dialogService.confirm(
      `Are you sure you want to delete user with id:${userId} ?`
    );
    if (confirmed) {
      this.store.dispatch(deleteUser({ deleteUserId: userId }));
      await this.toastService.displayMessage(
        `User with ID ${userId} deleted successfully!`,
        'delete'
      );
    } else {
      console.log('User deletion cancelled');
    }
  }

  showUserProfile(userId: string): Observable<User | undefined> {
    console.log(`Navigating to user profile with ID: ${userId}`);
    return this.store.select(selectUserById(userId));
  }
}
