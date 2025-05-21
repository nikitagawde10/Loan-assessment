import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CreateUserComponent } from './create-user/create-user.component';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../redux/user-credentials/user.selectors';
import { addUser } from '../redux/user-credentials/user.action';
import { User } from '../redux/user-credentials/user.state';
import { mapResultToUser } from './utils/user.utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
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

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(addUser({ user: mapResultToUser(result) }));
      }
    });
  }

  editClicked(user: User): void {
    console.log('Edit clicked for user:', user);
  }
}
