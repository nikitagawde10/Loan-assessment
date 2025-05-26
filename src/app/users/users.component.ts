import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../redux/user/user.selectors';
import { addUser, deleteUser, updateUser } from '../redux/user/user.action';
import { User } from '../redux/user/user.state';
import { mapResultToUser } from './utils/user.utils';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { UserFormDialogComponent } from './shared/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIcon,
    SharedModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'email',
    'name',
    'roles',
    'actions',
  ];
  dataSource$!: Observable<User[]>;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.dataSource$ = this.store.select(selectAllUsers);
  }

  openUserDialog(mode: 'create' | 'edit', user?: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        mode: mode,
        initialUserData: mode === 'edit' ? user : null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (mode === 'create') {
          this.store.dispatch(addUser({ user: mapResultToUser(result) }));
        } else {
          this.store.dispatch(
            updateUser({
              user: { ...mapResultToUser(result), id: user?.id || '' },
            })
          );
        }
      }
    });
  }

  deleteClicked(userId: string): void {
    console.log('Delete clicked for user ID:', userId);
    this.store.dispatch(deleteUser({ deleteUserId: userId }));
  }

  editClicked(user: User): void {
    console.log('Edit clicked for user:', user);
  }
}
