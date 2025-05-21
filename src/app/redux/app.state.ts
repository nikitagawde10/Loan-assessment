import { CustomersState } from './customers/customers.state';
import { UserRolesState } from './roles/roles.state';

export interface AppState {
  customers: CustomersState;
  userRoles: UserRolesState;
}
