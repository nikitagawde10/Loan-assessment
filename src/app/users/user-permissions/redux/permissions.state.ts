export interface Permission {
  id: string;
  name: string;
  description: string;
}
export interface UserPermission {
  userId: string;
  userName: string;
  email: string;
  permissions: Permission[];
}
export interface PermissionsState {
  permissions: Permission[];
  userPermissions: UserPermission[];
}
export const initialPermissionsState: PermissionsState = {
  permissions: [
    { id: '1', name: 'VIEW_USERS', description: 'Can view the list of users' },
    { id: '2', name: 'CREATE_USERS', description: 'Can create new users' },
    {
      id: '3',
      name: 'EDIT_USERS',
      description: 'Can edit existing user information',
    },
    { id: '4', name: 'DELETE_USERS', description: 'Can delete users' },
    {
      id: '5',
      name: 'MANAGE_ROLES',
      description: 'Can manage user roles and permissions',
    },
  ],
  userPermissions: [
    {
      userId: 'u1',
      userName: 'thor',
      email: 'thor.odinson@marvel.com',
      permissions: [
        {
          id: '1',
          name: 'VIEW_USERS',
          description: 'Can view the list of users',
        },
        { id: '2', name: 'CREATE_USERS', description: 'Can create new users' },
      ],
    },
    {
      userId: 'u2',
      userName: 'ironman',
      email: 'tony.stark@marvel.com',
      permissions: [
        {
          id: '1',
          name: 'VIEW_USERS',
          description: 'Can view the list of users',
        },
        {
          id: '3',
          name: 'EDIT_USERS',
          description: 'Can edit existing user information',
        },
      ],
    },
    {
      userId: 'u3',
      userName: 'bucky',
      email: 'bucky.barnes@marvel.com',
      permissions: [
        {
          id: '1',
          name: 'VIEW_USERS',
          description: 'Can view the list of users',
        },
        { id: '2', name: 'CREATE_USERS', description: 'Can create new users' },
        {
          id: '5',
          name: 'MANAGE_ROLES',
          description: 'Can manage user roles and permissions',
        },
      ],
    },
  ],
};
