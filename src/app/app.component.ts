import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './redux/login/login.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HomeNavComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'loan-portal';
  isLoggedIn$!: Observable<boolean>;
  private store = inject(Store);

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  ngOnDestroy(): void {}
}
