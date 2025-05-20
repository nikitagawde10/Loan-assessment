import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userEmail = '';
  userInitial = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const email = this.authService.getUserEmail();
    if (email) {
      this.userEmail = email;
      this.userInitial = email.charAt(0).toUpperCase();
    } else {
      this.userEmail = 'admin@admin.com';
      this.userInitial = 'A';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
