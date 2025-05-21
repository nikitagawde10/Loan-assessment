import { provideState } from '@ngrx/store';
import { customersReducer } from './customers/customers.reducer';
import { userRolesReducer } from './roles/roles.reducer';
import { userCredentialsReducer } from './user-credentials/user.reducer';

export const stateProviders = [
  { name: 'customers', reducer: customersReducer },
  { name: 'userRoles', reducer: userRolesReducer },
  { name: 'userCredentials', reducer: userCredentialsReducer },
  { name: 'users', reducer: userCredentialsReducer },
].map(provideState);
