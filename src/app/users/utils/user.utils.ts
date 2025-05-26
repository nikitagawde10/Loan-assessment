import { User } from '../redux/user.state';

export const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const checkProtected = (role: string): 'yes' | 'no' => {
  return ['admin', 'superadmin'].includes(role) ? 'yes' : 'no';
};

export const mapResultToUser = (result: any, existingId?: string): User => {
  console.log('Mapping result to user:', result);
  return {
    id: existingId || generateUserId(),
    userName: result.userName,
    email: result.email,
    name: result.name,
    roleName: result.roleName,
    protected: checkProtected(result.roleName),
    password: result.password,
  };
};
