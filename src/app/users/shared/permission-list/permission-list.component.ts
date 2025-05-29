import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Permission } from '../../user-permissions/redux/permissions.state';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css'],
  imports: [MatCard, MatCardTitle, MatDivider, MatCheckboxModule, CommonModule],
})
export class PermissionListComponent {
  @Input() title = '';
  @Input() availablePermissions: Permission[] = [];
  @Input() selectedPermissions: Permission[] = [];
  @Input() readonly = false;

  @Output() selectedPermissionsChange = new EventEmitter<Permission[]>(); //returns an array of permissions

  isSelected(p: Permission): boolean {
    return this.selectedPermissions.some((s) => s.id === p.id);
  }

  onPermissionToggle(p: Permission, checked: boolean): void {
    const next = checked
      ? [...this.selectedPermissions, p] //if newly checked then add it to the list
      : this.selectedPermissions.filter((x) => x.id !== p.id); //unchecked so remove it from the list
    this.selectedPermissionsChange.emit(next);
  }
}
