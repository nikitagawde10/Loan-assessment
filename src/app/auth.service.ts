import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from './redux/login/login.action';
import { selectUser } from './redux/user/user.selectors';
import { selectLoggedInUser } from './redux/login/login.selectors';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store = inject(Store);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    // Use the selectUser selector which finds the user based on email and password
    return this.store.select(selectUser(email, password)).pipe(
      take(1), // Take only the first value emitted by the selector
      map((foundUser) => {
        if (foundUser) {
          // Dispatch loginSuccess with the found user
          this.store.dispatch(loginSuccess({ user: foundUser }));
          return true; // Indicate successful login
        } else {
          return false; // Indicate login failure
        }
      })
    );
  }

  logout(): void {
    // Dispatch logout action
    this.store.dispatch(logout());
  }

  // Method to get the logged-in user's email from the store
  getUserEmail(): Observable<string | null> {
    return this.store.select(selectLoggedInUser).pipe(
      map((user) => (user ? user.email : null)) // Map the user object to the email or null
    );
  }
}
