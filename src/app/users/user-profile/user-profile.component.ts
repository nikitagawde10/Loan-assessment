import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { User } from '../redux/user.state';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User | undefined>;
  private userService = inject(UsersService);
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    console.log('UserProfileComponent initialized');
    this.user$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((userId) => this.userService.showUserProfile(userId))
    );
  }
}
