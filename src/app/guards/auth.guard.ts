import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const allowedRoles = this.getAllowedRoles(route);

    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.authService.getUserRole(),
    ]).pipe(
      take(1),
      map(([isLoggedIn, userRole]) =>
        this.checkAccess(isLoggedIn, userRole, allowedRoles, state.url)
      )
    );
  }

  private getAllowedRoles(route: ActivatedRouteSnapshot): string[] | undefined {
    // Find the deepest child route to get role restrictions
    let targetRoute = route;
    while (targetRoute.firstChild) {
      targetRoute = targetRoute.firstChild;
    }
    return targetRoute.data['roles'] as string[] | undefined;
  }

  private checkAccess(
    isLoggedIn: boolean,
    userRole: string | null,
    allowedRoles: string[] | undefined,
    routeUrl: string
  ): boolean | UrlTree {
    console.log(
      `🔍 AuthGuard Check - Route: ${routeUrl}, Roles: ${allowedRoles}, User: ${userRole}, Logged in: ${isLoggedIn}`
    );

    // Not logged in? Go to login
    if (!isLoggedIn) {
      console.log('❌ User not logged in - redirecting to login');
      return this.router.parseUrl('/login');
    }

    // No role restrictions? Allow access
    if (!allowedRoles?.length) {
      console.log('✅ No role restrictions - access granted');
      return true;
    }

    // Check if user has required role
    if (userRole && allowedRoles.includes(userRole)) {
      console.log('✅ User has required role - access granted');
      return true;
    }

    // User doesn't have required role
    console.log('❌ Insufficient permissions - redirecting to forbidden');
    return this.router.parseUrl('/forbidden');
  }
}
