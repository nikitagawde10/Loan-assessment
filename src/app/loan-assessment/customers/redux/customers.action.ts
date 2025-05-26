import { createAction, props } from '@ngrx/store';
import { Customer } from './customers.state';

export const loadCustomers = createAction('[Customers] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customers] Load Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers] Load Failure',
  props<{ error: string }>()
);
