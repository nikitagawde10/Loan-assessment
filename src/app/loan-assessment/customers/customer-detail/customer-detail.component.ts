import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Person } from '../api.service';
@Component({
  selector: 'app-customer-detail',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
})
export class CustomerDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Person) {}
}
