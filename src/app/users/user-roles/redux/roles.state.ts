export interface UserRole {
  roleName: string;
  protected: string;
}

export interface UserRolesState {
  roles: UserRole[];
  loading: boolean;
  error: string | null;
}

export const initialUserRolesState: UserRolesState = {
  roles: [
    {
      roleName: 'admin',
      protected: 'Yes',
    },
    {
      roleName: 'superadmin',
      protected: 'Yes',
    },
    {
      roleName: 'user',
      protected: 'No',
    },
    {
      roleName: 'rm',
      protected: 'No',
    },
    {
      roleName: 'hr',
      protected: 'No',
    },
  ],
  loading: false,
  error: null,
};
