import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    RouterOutlet,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
  ],
})
export class HomeNavComponent {
  constructor(private router: Router) {}
}
