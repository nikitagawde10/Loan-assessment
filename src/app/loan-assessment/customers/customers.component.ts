import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CustomersService } from './customers.service';
import { People } from './api.service';
import { MatButtonModule } from '@angular/material/button';
import { catchError, EMPTY } from 'rxjs';
import { ToastService } from '../../users/shared/toast/toast.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, MatTableModule, MatButtonModule],

  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  private toast = inject(ToastService);

  getMoreDetails(id: number) {
    this.customerService
      .getPersonDetails(id)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.toast.displayMessage('Failed to load details', 'delete');
          return EMPTY;
        })
      )
      .subscribe((personDetail) => {
        this.dialog.open(CustomerDetailComponent, {
          data: personDetail,
        });
      });
  }

  displayedColumns: string[] = ['uid', 'name', 'actions'];
  dataSource = new MatTableDataSource<People>([]);
  customerService = inject(CustomersService);
  @ViewChild(MatTable) table!: MatTable<People>;

  ngOnInit(): void {
    this.customerService.getAllPeople().subscribe((people) => {
      if (people) {
        this.dataSource.data = people;
        if (this.table) {
          this.table.renderRows();
        }
      }
    });
  }
}
