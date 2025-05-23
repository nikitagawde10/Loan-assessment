import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-forbidden',
  imports: [RouterModule, MatButton],
  templateUrl: './access-forbidden.component.html',
  styleUrl: './access-forbidden.component.css',
})
export class AccessForbiddenComponent {}
