import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { logout } from '../redux/login/login.action';
import { CommonModule } from '@angular/common';
import { selectLoggedInUser } from '../redux/login/login.selectors';
import { UserProfileComponent } from '../users/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userEmail$!: Observable<string | null>;
  userId: string | null = null;
  private subscription!: Subscription;

  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.userEmail$ = this.authService.getUserEmail();

    this.subscription = this.store
      .select(selectLoggedInUser)
      .subscribe((user) => {
        this.userId = user?.id || null;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  openUserProfile(): void {
    if (this.userId) {
      this.router.navigate(['/user-profile', this.userId]);
    }
  }
}
