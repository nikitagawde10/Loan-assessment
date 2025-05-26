import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { MatTable } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Customer } from './redux/customers.state';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'panNumber', 'aadharNumber'];
  dataSource = new MatTableDataSource<Customer>([]);
  customerService = inject(CustomersService);
  @ViewChild(MatTable) table!: MatTable<Customer>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((customers) => {
      if (customers) {
        this.dataSource.data = customers;
        if (this.table) {
          this.table.renderRows();
        }
      }
    });
  }
}
