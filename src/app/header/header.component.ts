import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../redux/login/login.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
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

  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  ngOnInit(): void {
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnDestroy(): void {}

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
