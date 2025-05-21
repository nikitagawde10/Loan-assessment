import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule],
})
export class UploadDocumentsComponent {
  aadhaarFile: File | null = null;
  panFile: File | null = null;
  aadhaarFileName = '';
  panFileName = '';

  constructor(private snackBar: MatSnackBar) {}

  onAadhaarFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.aadhaarFile = element.files[0];
      this.aadhaarFileName = this.aadhaarFile.name;
    }
  }

  onPanFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.panFile = element.files[0];
      this.panFileName = this.panFile.name;
    }
  }

  isReadyToUpload(): boolean {
    return !!this.aadhaarFile || !!this.panFile;
  }

  uploadFiles(): void {
    setTimeout(() => {
      this.snackBar.open('Documents uploaded successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

      // Reset form
      this.resetFields();
    }, 1500);
  }
  resetFields = () => {
    this.aadhaarFile = null;
    this.panFile = null;
    this.aadhaarFileName = '';
    this.panFileName = '';
  };
}
