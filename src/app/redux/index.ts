import { provideState } from '@ngrx/store';
import { customersReducer } from './customers/customers.reducer';
import { userRolesReducer } from './roles/roles.reducer';

export const stateProviders = [
  { name: 'customers', reducer: customersReducer },
  { name: 'userRoles', reducer: userRolesReducer },
].map(provideState);
