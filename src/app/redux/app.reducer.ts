import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { customersReducer } from './customers/customers.reducer';

export const reducers: ActionReducerMap<AppState> = {
  customers: customersReducer,
};
