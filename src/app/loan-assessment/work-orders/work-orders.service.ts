import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WorkOrder } from './redux/workOrders.state';
import { changeWorkOrderStatus } from './redux/workOrder.action';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private store = inject(Store);
  constructor() {}

  selectAllWorkOrders(): Observable<WorkOrder[]> {
    return this.store.select((state) => state.workOrders.workOrders);
  }

  changeWorkOrderStatus(orderId: string, newStatus: string): void {
    this.store.dispatch(
      changeWorkOrderStatus({
        workOrderId: orderId,
        status: newStatus as any,
      })
    );
  }
}
// addUser(data: any): void {
//   const newUser = mapResultToUser(data);
//   this.store.dispatch(addUser({ user: newUser }));
// }
