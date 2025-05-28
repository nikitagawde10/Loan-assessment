import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  displayMessage(
    message: string,
    type: 'create' | 'update' | 'delete'
  ): Promise<void> {
    const panelClass = {
      create: 'toast-success',
      update: 'toast-warning',
      delete: 'toast-error',
    }[type];

    return new Promise<void>((resolve) => {
      const snackRef = this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: [panelClass],
      });

      snackRef.afterDismissed().subscribe(() => {
        resolve(); // Resolves the promise after toast disappears
      });
    });
  }
}
