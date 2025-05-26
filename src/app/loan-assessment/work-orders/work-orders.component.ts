import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { WorkOrder, WorkOrderStatus } from './redux/workOrders.state';
import { WorkOrdersService } from './work-orders.service';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatMenu,
    MatMenuTrigger,
  ],
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css'],
})
export class WorkOrdersComponent implements OnInit {
  workOrderService = inject(WorkOrdersService);
  statusOptions: WorkOrderStatus[] = ['Pending', 'Approved', 'Rejected'];

  displayedColumns: string[] = ['orderId', 'customer', 'date', 'status'];

  dataSource$!: Observable<WorkOrder[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dataSource$ = this.workOrderService.selectAllWorkOrders();
  }

  onStatusChange(orderId: string, newStatus: string) {
    this.workOrderService.changeWorkOrderStatus(orderId, newStatus);
  }
}
