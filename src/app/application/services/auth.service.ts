import { Injectable } from '@angular/core';
import { User } from '../../domain/models/user.model';
import { MenuItem } from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  saveTokens(access: string, refresh: string): void {
    if (!this.isBrowser()) return;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  getAccessToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('accessToken') : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('refreshToken') : null;
  }

  saveUser(user: User): void {
    if (!this.isBrowser()) return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    if (!this.isBrowser()) return null;
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  saveMenu(menu: MenuItem[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  getMenu(): MenuItem[] {
    if (!this.isBrowser()) return [];
    const raw = localStorage.getItem('menu');
    return raw ? JSON.parse(raw) : [];
  }

  clearAll(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
  }
}
