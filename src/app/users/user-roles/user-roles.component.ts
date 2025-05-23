import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserRole } from '../../redux/roles/roles.state';
import { select, Store } from '@ngrx/store';
import { selectAllUserRoles } from '../../redux/roles/roles.selectors';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from './create-role/create-role.component';
import { addUserRole, deleteRole } from '../../redux/roles/roles.action';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIcon],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserRole>;

  constructor(private store: Store, private dialog: MatDialog) {}

  displayedColumns: string[] = ['roleName', 'protected', 'actions'];

  dataSource$!: Observable<UserRole[]>;

  ngOnInit(): void {
    this.dataSource$ = this.store.select(selectAllUserRoles);
  }

  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(addUserRole({ role: result }));
      }
    });
  }
  deleteClicked(roleName: string): void {
    console.log('Delete clicked for role name:', roleName);
    this.store.dispatch(deleteRole({ roleName: roleName }));
  }
}
