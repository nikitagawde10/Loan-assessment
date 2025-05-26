import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from './create-role/create-role.component';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { UserRole } from './redux/roles.state';
import { UserRoleService } from './user-role.service';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIcon],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserRole>;
  roleService = inject(UserRoleService);
  constructor(private store: Store, private dialog: MatDialog) {}

  displayedColumns: string[] = ['roleName', 'protected', 'actions'];

  dataSource$!: Observable<UserRole[]>;

  ngOnInit(): void {
    this.dataSource$ = this.roleService.selectAllUserRoles();
  }

  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleService.addUserRole(result);
      }
    });
  }
  deleteClicked(roleName: string): void {
    console.log('Delete clicked for role name:', roleName);
    this.roleService.deleteRole(roleName);
  }
}
