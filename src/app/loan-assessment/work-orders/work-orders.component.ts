import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  WorkOrder,
  WorkOrderStatus,
} from '../../redux/work-orders/workOrders.state';
import { selectAllWorkOrders } from '../../redux/work-orders/workOrder.selectors';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { changeWorkOrderStatus } from '../../redux/work-orders/workOrder.action';

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
  statusOptions: WorkOrderStatus[] = ['Pending', 'Approved', 'Rejected'];

  displayedColumns: string[] = ['orderId', 'customer', 'date', 'status'];

  dataSource$!: Observable<WorkOrder[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dataSource$ = this.store.select(selectAllWorkOrders);
  }

  onStatusChange(orderId: string, newStatus: string) {
    this.store.dispatch(
      changeWorkOrderStatus({ workOrderId: orderId, status: newStatus as any })
    );
  }
}
