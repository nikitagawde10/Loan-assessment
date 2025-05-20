import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-work-orders',
  imports: [MatChip, MatChipListbox, CommonModule, MatTable, MatTableModule],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.css',
})
export class WorkOrdersComponent {
  displayedColumns: string[] = ['orderId', 'customer', 'date', 'status'];
  dataSource = [
    {
      orderId: 'WO-1001',
      customer: 'John Doe',
      date: '2025-05-15',
      status: 'Approved',
    },
    {
      orderId: 'WO-1002',
      customer: 'Jane Smith',
      date: '2025-05-17',
      status: 'Pending',
    },
    {
      orderId: 'WO-1003',
      customer: 'Bob Johnson',
      date: '2025-05-18',
      status: 'Rejected',
    },
  ];
}
