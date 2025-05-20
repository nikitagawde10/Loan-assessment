import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.loggedIn.next(isLoggedIn);
  }

  login(username: string, password: string): Observable<boolean> {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", username);
    this.loggedIn.next(true);
    return this.loggedIn.asObservable();
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
