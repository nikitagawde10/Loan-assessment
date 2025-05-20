import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomersState } from './customers.state';

export const selectCustomersState =
  createFeatureSelector<CustomersState>('customers'); // ← this must match key in AppState

export const selectAllCustomers = createSelector(
  selectCustomersState,
  (state) => state.customers
);

export const selectCustomersLoading = createSelector(
  selectCustomersState,
  (state) => state.loading
);
