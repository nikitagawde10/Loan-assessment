import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  displayMessage(message: string, type: 'create' | 'update' | 'delete'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [this.getPanelClass(type)],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private getPanelClass(type: 'create' | 'update' | 'delete'): string {
    switch (type) {
      case 'create':
        return 'toast-success';
      case 'update':
        return 'toast-warning';
      case 'delete':
        return 'toast-error';
      default:
        return '';
    }
  }
}
