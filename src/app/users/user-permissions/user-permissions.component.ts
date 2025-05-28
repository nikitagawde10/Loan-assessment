import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { Permission, UserPermission } from './redux/permissions.state';
import { UserPermissionsService } from './user-permissions.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';

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
export class UserPermissionsComponent implements OnInit, OnDestroy {
  hasChanges: boolean = false;

  users$: Observable<UserPermission[]>;
  allPerms$: Observable<Permission[]>;

  selectedUser$!: Observable<UserPermission | undefined>;

  private selectedUserIdSubject = new BehaviorSubject<string>('');
  selectedUserId$ = this.selectedUserIdSubject.asObservable();

  selectedUser: UserPermission | null = null;
  currentPerms: Permission[] = [];
  private initialPerms: Permission[] = [];

  private subs = new Subscription();
  loading: boolean = false;

  private permissionsService = inject(UserPermissionsService);

  constructor() {
    console.log(
      'UserPermissionsComponent: Initial loading state:',
      this.loading
    );

    this.users$ = this.permissionsService
      .getAllUserPermissions()
      .pipe(
        tap((users) =>
          console.log('UserPermissionsComponent: users$ emitted:', users)
        )
      );
    this.allPerms$ = this.permissionsService
      .getAllPermissions()
      .pipe(
        tap((perms) =>
          console.log('UserPermissionsComponent: allPerms$ emitted:', perms)
        )
      );

    this.selectedUser$ = combineLatest([
      this.users$,
      this.selectedUserId$.pipe(distinctUntilChanged()),
    ]).pipe(
      tap(([users, selectedUserId]) =>
        console.log('UserPermissionsComponent: combineLatest emitted:', {
          users,
          selectedUserId,
        })
      ),
      map(([users, selectedUserId]) =>
        users.find((u) => u.userId === selectedUserId)
      ),
      tap((selectedUser) => {
        this.selectedUser = selectedUser || null;
        this.initialPerms = selectedUser ? [...selectedUser.permissions] : [];
        this.currentPerms = selectedUser ? [...selectedUser.permissions] : [];
        this.checkChanges();
        console.log(
          'UserPermissionsComponent: selectedUser$ emitted:',
          this.selectedUser
        );
        console.log(
          'UserPermissionsComponent: currentPerms updated:',
          this.currentPerms
        );
      })
    );

    this.subs.add(
      this.selectedUser$.subscribe(() =>
        console.log(
          'UserPermissionsComponent: selectedUser$ subscription triggered.'
        )
      )
    );
  }

  ngOnInit() {
    console.log('UserPermissionsComponent: ngOnInit');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onUserChange(id: string) {
    console.log('UserPermissionsComponent: User selected:', id);
    this.selectedUserIdSubject.next(id);
  }

  onPermsChanged(next: Permission[]) {
    console.log('UserPermissionsComponent: Permissions changed:', next);
    this.currentPerms = next;
    this.checkChanges();
  }

  checkChanges() {
    const currentPermsSorted = [...this.currentPerms].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const initialPermsSorted = [...this.initialPerms].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.hasChanges =
      JSON.stringify(currentPermsSorted) !== JSON.stringify(initialPermsSorted);
    console.log('UserPermissionsComponent: hasChanges:', this.hasChanges);
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
        this.currentPerms
      );
      console.log('UserPermissionsComponent: Saved successfully!');
      this.loading = false;
      this.initialPerms = [...this.currentPerms];
      this.checkChanges();
    } catch (err) {
      console.error('UserPermissionsComponent: Error saving changes:', err);
      this.loading = false;
    }
  }

  getUserDisplayName(user: UserPermission): string {
    return user.userName + ' (' + user.email + ')';
  }
}
