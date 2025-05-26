import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';
import { User } from './redux/user.state';
import { SharedModule } from './shared/shared.module';
import { UserFormDialogComponent } from './shared/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'userName',
    'email',
    'name',
    'roles',
    'actions',
  ];
  dataSource$!: Observable<User[]>;
  private userService = inject(UsersService);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource$ = this.userService.getAllUsers();
  }

  openUserDialog(mode: 'create' | 'edit', user?: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        mode,
        initialUserData: mode === 'edit' ? user : null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        mode === 'create'
          ? this.userService.addUser(result)
          : this.userService.updateUser({ ...result, id: user?.id });
      }
    });
  }

  deleteClicked(userId: string): void {
    this.userService.deleteUser(userId);
  }
}
