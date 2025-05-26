import { generateUserId } from '../utils/user.utils';

export interface User {
  id: string;
  roleName: string;
  protected: 'yes' | 'no';
  userName: string;
  email: string;
  password: string;
  name: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [
    {
      userName: 'thor',
      email: 'thor.odinson@marvel.com',
      name: 'Thor Odinson',
      roleName: 'superadmin',
      protected: 'yes',
      password: 'thor',
      id: generateUserId(),
    },
    {
      userName: 'ironman',
      email: 'tony.stark@marvel.com',
      name: 'Tony Stark',
      roleName: 'admin',
      protected: 'yes',
      password: 'ironman',
      id: generateUserId(),
    },
    {
      userName: 'groot',
      email: 'groot@marvel.com',
      name: 'I am Groot',
      roleName: 'rm',
      protected: 'no',
      password: 'groot',
      id: generateUserId(),
    },
    {
      userName: 'bucky',
      email: 'bucky.barnes@marvel.com',
      name: 'Bucky Barnes',
      roleName: 'hr',
      protected: 'no',
      password: 'bucky',
      id: generateUserId(),
    },
    {
      userName: 'rocket',
      email: 'rocket.gotg@marvel.com',
      name: 'Rocket Raccoon',
      roleName: 'user',
      protected: 'no',
      password: 'rocket',
      id: generateUserId(),
    },
  ],
  loading: false,
  error: null,
};
