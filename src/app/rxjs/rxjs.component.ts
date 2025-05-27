import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Observable, combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [MatButton],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent {
  // 📚 Let me explain each RxJS concept with simple examples:

  // ============================================================================
  // 🔍 CONCEPT 1: What is an Observable?
  // ============================================================================

  // Think of Observable like a "stream of data over time"
  explainObservable() {
    console.log('=== OBSERVABLE EXPLANATION ===');

    // 📦 Observable is like a box that will give you data later
    const numberStream = new Observable<number>((subscriber) => {
      console.log('Observable started!');
      subscriber.next(1); // Emit first value
      subscriber.next(2); // Emit second value
      subscriber.next(3); // Emit third value
      subscriber.complete(); // Done!
    });

    // 👂 To get data, you need to "subscribe" (listen)
    numberStream.subscribe({
      next: (value) => console.log('Received:', value),
      complete: () => console.log('Stream finished!'),
    });

    // Output:
    // Observable started!
    // Received: 1
    // Received: 2
    // Received: 3
    // Stream finished!
  }

  // ============================================================================
  // 🔍 CONCEPT 2: combineLatest
  // ============================================================================

  explainCombineLatest() {
    console.log('\n=== COMBINE LATEST EXPLANATION ===');

    // 🏃‍♂️ Imagine two runners (observables) in a race
    const runner1 = new Observable<string>((subscriber) => {
      setTimeout(() => subscriber.next("Runner1: I'm logged in!"), 1000);
    });

    const runner2 = new Observable<string>((subscriber) => {
      setTimeout(() => subscriber.next("Runner2: I'm an admin!"), 1500);
    });

    // 🤝 combineLatest waits for BOTH runners to finish, then combines results
    combineLatest([runner1, runner2]).subscribe(([result1, result2]) => {
      console.log('Both runners finished:');
      console.log('Result 1:', result1);
      console.log('Result 2:', result2);
    });

    // Output (after 1.5 seconds):
    // Both runners finished:
    // Result 1: Runner1: I'm logged in!
    // Result 2: Runner2: I'm an admin!
  }

  // ============================================================================
  // 🔍 CONCEPT 3: How AuthService Observables Work
  // ============================================================================

  simulateAuthService() {
    console.log('\n=== AUTH SERVICE SIMULATION ===');

    // This is what your AuthService methods probably look like:
    class MockAuthService {
      // 📡 This might check localStorage, make HTTP call, etc.
      isUserLoggedIn(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
          // Simulate checking authentication (maybe from localStorage)
          setTimeout(() => {
            const token = localStorage.getItem('auth-token');
            const isLoggedIn = !!token; // Convert to boolean
            console.log('✅ Checked login status:', isLoggedIn);
            subscriber.next(isLoggedIn);
            subscriber.complete();
          }, 500);
        });
      }

      // 👤 This might decode JWT token, call API, etc.
      getUserRole(): Observable<string | null> {
        return new Observable<string | null>((subscriber) => {
          // Simulate getting user role (maybe from JWT token)
          setTimeout(() => {
            const role = localStorage.getItem('user-role');
            console.log('👤 Got user role:', role);
            subscriber.next(role);
            subscriber.complete();
          }, 300);
        });
      }
    }

    const mockAuthService = new MockAuthService();

    // 🔄 Now let's see how combineLatest works with these:
    combineLatest([
      mockAuthService.isUserLoggedIn(),
      mockAuthService.getUserRole(),
    ]).subscribe(([isLoggedIn, userRole]) => {
      console.log('🔍 AuthGuard received:');
      console.log('  - Logged in:', isLoggedIn);
      console.log('  - User role:', userRole);

      // This is where the guard makes its decision
      if (!isLoggedIn) {
        console.log('❌ Redirect to login');
      } else if (userRole === 'admin') {
        console.log('✅ Allow access (admin)');
      } else {
        console.log('❌ Redirect to forbidden');
      }
    });
  }

  // ============================================================================
  // 🔍 CONCEPT 4: The 'pipe' and operators
  // ============================================================================

  explainPipeAndOperators() {
    console.log('\n=== PIPE AND OPERATORS EXPLANATION ===');

    // 🔧 Think of 'pipe' like a factory assembly line
    const numbers = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.next(5);
      subscriber.complete();
    });

    console.log('Original numbers:');
    numbers.subscribe((n) => console.log(n)); // 1, 2, 3, 4, 5

    console.log('\nAfter pipe with map (multiply by 2):');
    numbers
      .pipe(
        map((n) => n * 2),
        take(10) // Only take first 10 available emissions
      )
      .subscribe((n) => console.log(n)); // 2, 4, 6, 8, 10

    console.log('\nAfter pipe with take(3):');
    numbers
      .pipe(
        take(3) // Only take first 3 emissions
      )
      .subscribe((n) => console.log(n)); // 1, 2, 3 (then stops)
  }

  // ============================================================================
  // 🔍 CONCEPT 5: Putting it all together - AuthGuard Flow
  // ============================================================================

  simulateCompleteAuthGuardFlow() {
    console.log('\n=== COMPLETE AUTH GUARD FLOW ===');

    // 🎬 Let's simulate the entire flow:

    // Mock data
    localStorage.setItem('auth-token', 'abc123');
    localStorage.setItem('user-role', 'admin');

    const mockAuthService = {
      isUserLoggedIn: () =>
        new Observable<boolean>((sub) => {
          setTimeout(() => {
            console.log('1️⃣ Checking if user is logged in...');
            sub.next(true);
            sub.complete();
          }, 200);
        }),

      getUserRole: () =>
        new Observable<string>((sub) => {
          setTimeout(() => {
            console.log('2️⃣ Getting user role...');
            sub.next('admin');
            sub.complete();
          }, 300);
        }),
    };

    // 🛡️ This is exactly what happens in AuthGuard:
    console.log('🚀 Starting AuthGuard check...');

    combineLatest([
      mockAuthService.isUserLoggedIn(),
      mockAuthService.getUserRole(),
    ])
      .pipe(
        take(1), // Only takes first result
        map(([isLoggedIn, userRole]) => {
          console.log('3️⃣ Processing results...');
          console.log('   - Is logged in:', isLoggedIn);
          console.log('   - User role:', userRole);

          // Mock route requires 'admin' role
          const allowedRoles = ['admin'];

          if (!isLoggedIn) {
            console.log('❌ Not logged in - redirect to login');
            return false; // Would be router.parseUrl('/login')
          }

          if (allowedRoles.includes(userRole)) {
            console.log('✅ Access granted!');
            return true;
          }

          console.log('❌ Insufficient role - redirect to forbidden');
          return false; // Would be router.parseUrl('/forbidden')
        })
      )
      .subscribe((result) => {
        console.log('4️⃣ Final result:', result);
        console.log('🏁 AuthGuard finished!');
      });
  }
}

// 🎓 Run the examples to understand:
const explanation = new RxjsComponent();

// Uncomment these one by one to see each concept:
// explanation.explainObservable();
// explanation.explainCombineLatest();
// explanation.simulateAuthService();
// explanation.explainPipeAndOperators();
// explanation.simulateCompleteAuthGuardFlow();

// ============================================================================
// 📝 SUMMARY: What happens in AuthGuard
// ============================================================================

/*
1. 🚪 User tries to visit a protected route
2. 🛡️ Angular calls AuthGuard.canActivate()
3. 🔍 AuthGuard uses combineLatest to get TWO pieces of info:
   - Is user logged in? (from authService.isUserLoggedIn())
   - What's their role? (from authService.getUserRole())
4. ⏳ combineLatest waits for BOTH observables to emit values
5. 🔧 pipe() passes the results through operators:
   - take(1): "I only want one result, then stop listening"
   - map(): "Transform the [isLoggedIn, userRole] into a boolean or redirect"
6. ✅ If allowed: return true (let them in)
   ❌ If not allowed: return router.parseUrl('/login') (redirect)
7. 🚀 Angular uses this result to either allow navigation or redirect

Think of it like a bouncer at a club:
- Bouncer checks: "Do you have ID?" (isLoggedIn)
- Bouncer checks: "Are you VIP?" (userRole)  
- Bouncer decides: "You can enter" or "Go to the regular line"
*/
