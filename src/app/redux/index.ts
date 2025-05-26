import { provideState } from '@ngrx/store';
import { customersReducer } from './customers/customers.reducer';
import { userRolesReducer } from './roles/roles.reducer';
import { workOrdersReducer } from './work-orders/workOrder.reducer';
import { loginReducer } from './login/login.reducer';
import { userCredentialsReducer } from '../users/redux/user.reducer';

export const stateProviders = [
  { name: 'customers', reducer: customersReducer },
  { name: 'userRoles', reducer: userRolesReducer },
  { name: 'users', reducer: userCredentialsReducer },
  { name: 'workOrders', reducer: workOrdersReducer },
  { name: 'login', reducer: loginReducer },
].map(provideState);
