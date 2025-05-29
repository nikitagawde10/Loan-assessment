import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission, UserPermission } from './redux/permissions.state';
import { UserPermissionsService } from './user-permissions.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { DialogService } from '../shared/dialog/dialog.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css'],
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatCard,
    MatCardTitle,
    SharedModule,
    AsyncPipe,
    CommonModule,
    MatButton,
  ],
  standalone: true,
})
export class UserPermissionsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private toastService = inject(ToastService);
  selectedUserId = '';
  selectedUser: UserPermission | null = null;
  currentPermissions: Permission[] = [];
  private originalPermissions: Permission[] = [];
  loading = false;
  users$!: Observable<UserPermission[] | null>;
  allPermissions$!: Observable<Permission[] | null>;

  private permissionsService = inject(UserPermissionsService);
  constructor() {
    this.users$ = this.permissionsService.getAllUserPermissions();
    this.allPermissions$ = this.permissionsService.getAllPermissions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserChange(userId: string) {
    this.selectedUserId = userId;

    if (!userId) {
      this.resetUserSelection();
      return;
    }

    // Find and set the selected user
    this.users$
      .pipe(
        takeUntil(this.destroy$),
        map((users) => users?.find((u) => u.userId === userId))
      )
      .subscribe((user) => {
        this.selectedUser = user || null;
        if (user) {
          this.originalPermissions = [...user.permissions];
          this.currentPermissions = [...user.permissions];
        } else {
          this.resetUserSelection();
        }
      });
  }

  onPermissionsChanged(permissions: Permission[]) {
    console.log('UserPermissionsComponent: Permissions changed:', permissions);
    this.currentPermissions = permissions;
  }

  get hasChanges(): boolean {
    if (!this.selectedUser) return false;

    const sortPermissions = (perms: Permission[]) =>
      [...perms].sort((a, b) => a.name.localeCompare(b.name));

    const currentSorted = sortPermissions(this.currentPermissions);
    const originalSorted = sortPermissions(this.originalPermissions);

    return JSON.stringify(currentSorted) !== JSON.stringify(originalSorted);
  }

  async saveChanges() {
    if (!this.selectedUser || !this.hasChanges) {
      console.log(
        'UserPermissionsComponent: Save changes aborted (no user selected or no changes)'
      );
      return;
    }

    this.loading = true;
    console.log(
      'UserPermissionsComponent: Saving changes for user:',
      this.selectedUser.userId
    );

    try {
      await this.permissionsService.updateUserPermissions(
        this.selectedUser.userId,
        this.currentPermissions
      );
      console.log('UserPermissionsComponent: Saved successfully!');
      this.originalPermissions = [...this.currentPermissions];
    } catch (err) {
      console.error('UserPermissionsComponent: Error saving changes:', err);
    } finally {
      this.loading = false;
      this.toastService.displayMessage('Permissions saved', 'create');
    }
  }

  getUserDisplayName(user: UserPermission): string {
    return `${user.userName} (${user.email})`;
  }

  private resetUserSelection() {
    this.selectedUser = null;
    this.currentPermissions = [];
    this.originalPermissions = [];
  }
}
