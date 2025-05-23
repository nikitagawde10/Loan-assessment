import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
// import { AuthService } from '../auth.service'; // AuthService is not directly needed here anymore
import { Store } from '@ngrx/store'; // Import Store
import { selectIsLoggedIn } from '../redux/login/login.selectors'; // Import the selector
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  // constructor(private authService: AuthService, private router: Router) {} // Remove old constructor
  private store = inject(Store); // Inject Store
  private router = inject(Router); // Inject Router

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; // Allow activation if logged in
        }

        // Redirect to login page if not authenticated
        return this.router.parseUrl('/login');
      })
    );
  }
}
