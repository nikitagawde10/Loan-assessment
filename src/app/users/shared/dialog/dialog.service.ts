import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialog = inject(MatDialog);

  confirm(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { message },
    });

    return firstValueFrom(dialogRef.afterClosed());
  }
}
