import { provideState } from '@ngrx/store';

import { workOrdersReducer } from './loan-assessment/work-orders/redux/workOrder.reducer';
import { loginReducer } from './login/redux/login.reducer';
import { userCredentialsReducer } from './users/redux/user.reducer';
import { customersReducer } from './loan-assessment/customers/redux/customers.reducer';
import { userRolesReducer } from './users/user-roles/redux/roles.reducer';

export const stateProviders = [
  { name: 'customers', reducer: customersReducer },
  { name: 'userRoles', reducer: userRolesReducer },
  { name: 'users', reducer: userCredentialsReducer },
  { name: 'workOrders', reducer: workOrdersReducer },
  { name: 'login', reducer: loginReducer },
].map(provideState);
