import { User } from '../../domain/models/user.model';

export interface MenuItem {
  label: string;
  path: string;
  roles?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  menu: MenuItem[];
  error: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  menu: [],
  error: null,
};
