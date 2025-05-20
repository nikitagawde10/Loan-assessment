import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "../auth.service";
import { Router, UrlTree } from "@angular/router";

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj("AuthService", ["isLoggedIn"]);
    mockRouter = jasmine.createSpyObj("Router", ["parseUrl"]);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it("should allow access when user is logged in", () => {
    mockAuthService.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it("should redirect to login when user is not logged in", () => {
    const fakeUrlTree = {} as UrlTree;
    mockAuthService.isLoggedIn.and.returnValue(false);
    mockRouter.parseUrl.and.returnValue(fakeUrlTree);

    const result = guard.canActivate();
    expect(mockRouter.parseUrl).toHaveBeenCalledWith("/login");
    expect(result).toBe(fakeUrlTree);
  });
});
