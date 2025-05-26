export type WorkOrderStatus = 'Pending' | 'Approved' | 'Rejected';

export interface WorkOrder {
  orderId: string;
  customer: string;
  date: string;
  status: WorkOrderStatus;
}

export interface WorkOrdersState {
  workOrders: WorkOrder[];
  loading: boolean;
  error: string | null;
}

export const initialWorkOrdersState: WorkOrdersState = {
  workOrders: [
    {
      orderId: 'WO-1001',
      customer: 'John Doe',
      date: '2025-05-15',
      status: 'Approved',
    },
    {
      orderId: 'WO-1002',
      customer: 'Jane Smith',
      date: '2025-05-17',
      status: 'Pending',
    },
    {
      orderId: 'WO-1003',
      customer: 'Bob Johnson',
      date: '2025-05-18',
      status: 'Rejected',
    },
  ],
  loading: false,
  error: null,
};
