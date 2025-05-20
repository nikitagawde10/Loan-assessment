export interface Customer {
  id: number;
  name: string;
  panNumber: string;
  aadharNumber: string;
}

export interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

export const initialCustomersState: CustomersState = {
  customers: [
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
  ],
  loading: false,
  error: null,
};
