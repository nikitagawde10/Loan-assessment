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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let currentRouteState = state.root;
    while (currentRouteState.firstChild) {
      currentRouteState = currentRouteState.firstChild;
    }
    const allowedRoles = currentRouteState.data['roles'] as string[];

    console.log('AuthGuard: Accessing route:', state.url);
    console.log('AuthGuard: Allowed roles for this route:', allowedRoles);

    return combineLatest([
      this.store.select(selectIsLoggedIn),
      this.store.select(selectUserRole),
    ]).pipe(
      take(1),
      tap(([isLoggedIn, userRole]) => {
        console.log('AuthGuard: Current login status:', isLoggedIn);
        console.log('AuthGuard: Current user role:', userRole);
      }),
      map(([isLoggedIn, userRole]) => {
        if (!isLoggedIn) {
          console.log('AuthGuard: Not logged in, redirecting to /login');
          return this.router.parseUrl('/login');
        }

        if (allowedRoles && allowedRoles.length > 0) {
          if (userRole && allowedRoles.includes(userRole)) {
            console.log('AuthGuard: Role authorized, allowing access');
            return true;
          } else {
            console.log(
              'AuthGuard: Role not authorized, redirecting to /login'
            );
            return this.router.parseUrl('/forbidden');
          }
        }

        console.log('AuthGuard: No specific roles required, allowing access');
        return true;
      })
    );
  }
}
