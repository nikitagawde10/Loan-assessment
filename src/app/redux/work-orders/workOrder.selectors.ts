import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkOrdersState } from './workOrders.state';

export const selectWorkOrdersState =
  createFeatureSelector<WorkOrdersState>('workOrders');

export const selectAllWorkOrders = createSelector(
  selectWorkOrdersState,
  (state) => state.workOrders
);

export const selectWorkOrdersLoading = createSelector(
  selectWorkOrdersState,
  (state) => state.loading
);
