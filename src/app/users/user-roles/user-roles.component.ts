import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent {
  displayedColumns: string[] = ['roleName', 'protected'];
  dataSource = [
    {
      roleName: 'admin',
      protected: 'Yes',
    },
    {
      roleName: 'superadmin',
      protected: 'Yes',
    },
    {
      roleName: 'user',
      protected: 'No',
    },
    {
      roleName: 'rm',
      protected: 'No',
    },
    {
      roleName: 'hr',
      protected: 'No',
    },
  ];
}
