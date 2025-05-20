import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  imports: [MatTableModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  displayedColumns: string[] = ['id', 'name', 'panNumber', 'aadharNumber'];
  dataSource = [
    {
      id: 1,
      name: 'John Doe',
      panNumber: 'BNMPS1234C',
      aadharNumber: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      panNumber: 'BNMPS1234C',
      aadharNumber: '234-567-8901',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      panNumber: 'BNMPS1234C',
      aadharNumber: '345-678-9012',
    },
  ];
}
