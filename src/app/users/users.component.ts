import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from './create-user/create-user.component';

interface User {
  userName: string;
  email: string;
  name: string;
  roles: string;
}

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
  dataSource!: MatTableDataSource<User>;

  users: User[] = [
    {
      userName: 'thor',
      email: 'thor.odinson@marvel.com',
      name: 'Thor Odinson',
      roles: 'superadmin',
    },
    {
      userName: 'ironman',
      email: 'tony.stark@marvel.com',
      name: 'Tony Stark',
      roles: 'admin',
    },
    {
      userName: 'groot',
      email: 'groot@marvelt.com',
      name: 'I am Groot',
      roles: 'rm',
    },
    {
      userName: 'bucky',
      email: 'bucky.barnes@marvelt.com',
      name: 'Bucky Barnes',
      roles: 'hr',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User created:', result);
        const newUser: User = {
          userName: result.username,
          email: result.email,
          name: result.name,
          roles: result.role,
        };
        this.users.push(newUser);
        this.dataSource.data = this.users;
      }
    });
  }

  editClicked(user: User): void {
    console.log('Edit clicked for user:', user);

    const index = this.users.findIndex((u) => u.userName === user.userName);
    if (index !== -1) {
      this.users[index] = { ...user };
      this.dataSource.data = [...this.users];
    }
  }
}
