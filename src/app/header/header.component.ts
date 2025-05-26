import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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

    this.subscription = this.authService.getLoggedInUser().subscribe((user) => {
      this.userId = user?.id || null;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openUserProfile(): void {
    if (this.userId) {
      this.router.navigate(['/users/user-profile', this.userId]);
    }
  }
}
