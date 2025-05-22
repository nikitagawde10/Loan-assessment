import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css',
})
export class CreateRoleComponent {
  createRoleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRoleComponent>
  ) {
    this.createRoleForm = this.fb.group({
      roleName: ['', [Validators.required]],
      protected: ['', [Validators.required]],
    });
  }
  onRoleCreated() {
    if (this.createRoleForm.valid) {
      this.dialogRef.close(this.createRoleForm.value);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
