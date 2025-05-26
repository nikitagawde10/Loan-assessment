import { provideState } from '@ngrx/store';
import { userRolesReducer } from './roles/roles.reducer';
import { workOrdersReducer } from './work-orders/workOrder.reducer';
import { loginReducer } from './login/login.reducer';
import { userCredentialsReducer } from '../users/redux/user.reducer';
import { customersReducer } from '../loan-assessment/customers/redux/customers.reducer';

export const stateProviders = [
  { name: 'customers', reducer: customersReducer },
  { name: 'userRoles', reducer: userRolesReducer },
  { name: 'users', reducer: userCredentialsReducer },
  { name: 'workOrders', reducer: workOrdersReducer },
  { name: 'login', reducer: loginReducer },
].map(provideState);
