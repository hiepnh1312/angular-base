import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { MenuItem } from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  login(username: string, password: string): Observable<{
    user: User,
    accessToken: string,
    refreshToken: string,
    menu: MenuItem[]
  } | null> {
    if (username === 'admin' && password === 'admin') {
      return of({
        user: {
          id: 1,
          username: 'admin',
          token: 'fake-access-token',
          role: 'admin'
        },
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
        menu: [
          { label: 'sidebar.home', path: '/home', roles: ['admin'] },
          { label: 'sidebar.dashboard', path: '/dashboard', roles: ['admin'] }
        ]
      }).pipe(delay(500));
    }

    if (username === 'user' && password === 'user') {
      return of({
        user: {
          id: 2,
          username: 'user',
          token: 'fake-user-token',
          role: 'user'
        },
        accessToken: 'fake-user-token',
        refreshToken: 'fake-refresh-token',
        menu: [
          { label: 'sidebar.home', path: '/home', roles: ['user'] }
        ]
      }).pipe(delay(500));
    }

    return of(null).pipe(delay(500));
  }

  refreshToken(): Observable<string> {
    return of('refreshed-token-' + Math.random().toString(36).substring(2)).pipe(delay(300));
  }
}
