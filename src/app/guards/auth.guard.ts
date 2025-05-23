import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsLoggedIn,
  selectUserRole,
} from '../redux/login/login.selectors';
import { Observable, combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // 🔍 Traverse to the deepest child route to get route-specific data
    let targetRoute = route;
    while (targetRoute.firstChild) {
      targetRoute = targetRoute.firstChild;
    }

    const allowedRoles = targetRoute.data['roles'] as string[] | undefined;

    return combineLatest([
      this.store.select(selectIsLoggedIn),
      this.store.select(selectUserRole),
    ]).pipe(
      take(1), // Only take one emission
      tap(([isLoggedIn, userRole]) => {
        console.log('AuthGuard: Route =', state.url);
        console.log('AuthGuard: Allowed roles =', allowedRoles);
        console.log('AuthGuard: Logged in =', isLoggedIn);
        console.log('AuthGuard: User role =', userRole);
      }),
      map(([isLoggedIn, userRole]) => {
        // 🛑 If user is not logged in, redirect to login
        if (!isLoggedIn) {
          return this.router.parseUrl('/login');
        }

        // ✅ If route has role restrictions, validate them
        if (allowedRoles?.length) {
          if (userRole && allowedRoles.includes(userRole)) {
            return true; // Access granted
          } else {
            return this.router.parseUrl('/forbidden'); // ❌ Forbidden
          }
        }

        // ✅ If no roles specified, allow access
        return true;
      })
    );
  }
}
