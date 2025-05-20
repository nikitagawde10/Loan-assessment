import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userName: string = 'admin';
  password: string = 'admin';
  login(userName: string, password: string): boolean {
    if (this.userName === userName && this.password === password) {
      return true;
    }
    return false;
  }

  constructor() {}
}
