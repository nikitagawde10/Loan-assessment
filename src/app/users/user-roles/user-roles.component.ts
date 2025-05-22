import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserRole } from '../../redux/roles/roles.state';
import { Store } from '@ngrx/store';
import { selectAllUserRoles } from '../../redux/roles/roles.selectors';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from './create-role/create-role.component';
import { addUserRole } from '../../redux/roles/roles.action';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserRole>;

  constructor(private store: Store, private dialog: MatDialog) {}

  displayedColumns: string[] = ['roleName', 'protected'];

  dataSource = new MatTableDataSource<UserRole>([]);

  ngOnInit(): void {
    this.store.select(selectAllUserRoles).subscribe((userRoles) => {
      if (userRoles) {
        this.dataSource.data = userRoles;
        console.log('userRoles', userRoles);
        if (this.table) {
          this.table.renderRows();
        }
      }
    });
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
}
