import { createReducer, on } from '@ngrx/store';
import { initialWorkOrdersState } from './workOrders.state';
import {
  changeWorkOrderStatus,
  loadWorkOrders,
  loadWorkOrdersFailure,
  loadWorkOrdersSuccess,
} from './workOrder.action';

export const workOrdersReducer = createReducer(
  initialWorkOrdersState,

  on(loadWorkOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadWorkOrdersSuccess, (state, { workOrders }) => ({
    ...state,
    workOrders,
    loading: false,
    error: null,
  })),

  on(loadWorkOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(changeWorkOrderStatus, (state, { workOrderId, status }) => ({
    ...state,
    workOrders: state.workOrders.map((u) =>
      u.orderId === workOrderId ? { ...u, status } : u
    ),
  }))
);
