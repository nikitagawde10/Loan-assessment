import { provideState } from '@ngrx/store';

import { workOrdersReducer } from './loan-assessment/work-orders/redux/workOrder.reducer';
import { loginReducer } from './login/redux/login.reducer';
import { userCredentialsReducer } from './users/redux/user.reducer';
import { userRolesReducer } from './users/user-roles/redux/roles.reducer';
import { permissionsReducer } from './users/user-permissions/redux/permissions.reducer';

export const stateProviders = [
  { name: 'userRoles', reducer: userRolesReducer },
  { name: 'users', reducer: userCredentialsReducer },
  { name: 'workOrders', reducer: workOrdersReducer },
  { name: 'login', reducer: loginReducer },
  { name: 'permissions', reducer: permissionsReducer },
].map(provideState);
