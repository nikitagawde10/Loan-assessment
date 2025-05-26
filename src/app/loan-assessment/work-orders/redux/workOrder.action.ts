import { createAction, props } from '@ngrx/store';
import { WorkOrder, WorkOrderStatus } from './workOrders.state';

export const loadWorkOrders = createAction('[WorkOrders] Load WorkOrders');

export const loadWorkOrdersSuccess = createAction(
  '[WorkOrders] Load Success',
  props<{ workOrders: WorkOrder[] }>()
);

export const loadWorkOrdersFailure = createAction(
  '[WorkOrders] Load Failure',
  props<{ error: string }>()
);

export const addWorkOrder = createAction(
  '[WorkOrders] Add WorkOrder',
  props<{ workOrder: WorkOrder }>()
);

export const changeWorkOrderStatus = createAction(
  '[WorkOrder] Change Status',
  props<{ workOrderId: string; status: WorkOrderStatus }>()
);
