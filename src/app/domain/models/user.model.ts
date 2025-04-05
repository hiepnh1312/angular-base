export interface User {
  id: number;
  username: string;
  token: string;
  role?: string;
  menu?: { label: string; path: string }[];
}
