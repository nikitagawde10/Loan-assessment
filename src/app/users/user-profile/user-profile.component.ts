import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { selectUserById } from '../../redux/user/user.selectors';
import { User } from '../../redux/user/user.state';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    console.log('UserProfileComponent initialized');
    this.user$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((userId) => this.store.select(selectUserById(userId)))
    );
  }
}
