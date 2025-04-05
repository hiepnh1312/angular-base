import { User } from '../../domain/models/user.model';

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  parentId?: string | null;
  children?: MenuItem[];
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
export interface MenuFlatNode extends MenuItem {
  level: number;
  expandable: boolean;
}
