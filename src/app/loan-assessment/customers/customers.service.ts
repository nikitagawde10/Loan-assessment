import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCustomers } from './redux/customers.selectors';
import { Observable } from 'rxjs';
import { Customer } from './redux/customers.state';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private store = inject(Store);

  getAllCustomers(): Observable<Customer[]> {
    return this.store.select(selectAllCustomers);
  }
  constructor() {}
}
