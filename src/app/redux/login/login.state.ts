import { User } from "../user/user.state";

export interface Login {
  email: string;
  password: string;
}

export interface LoginState {
  loginCredentials: Login;
  loggedInUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export const initialLoginState: LoginState = {
  loginCredentials: {
    email: '',
    password: '',
  },
  loggedInUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};
