import { Component, inject, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { User } from '../../../redux/user/user.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  mode: 'create' | 'edit';
  initialUserData: User | null;
}

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css',
})
export class UserFormDialogComponent {
  mode: 'create' | 'edit';
  initialUserData: User | null;

  createUserForm!: FormGroup;
  private dialogRef = inject(MatDialogRef<UserFormDialogComponent>);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.mode = data.mode;
    this.initialUserData = data.initialUserData;

    this.createUserForm = this.fb.group({
      userName: [this.initialUserData?.userName || '', [Validators.required]],
      email: [
        this.initialUserData?.email || '',
        [Validators.required, Validators.email],
      ],
      name: [this.initialUserData?.name || '', [Validators.required]],
      roleName: [this.initialUserData?.roleName || '', [Validators.required]],
      password: [this.initialUserData?.password || '', [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.dialogRef.close(this.createUserForm.value);
    }
  }
}
