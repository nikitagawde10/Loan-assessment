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

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserRole>;

  constructor(private store: Store) {}

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
}
