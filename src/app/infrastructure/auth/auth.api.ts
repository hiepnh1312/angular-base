import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { MenuItem } from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  login(username: string, password: string): Observable<{
    user: User;
    accessToken: string;
    refreshToken: string;
    menu: MenuItem[];
  } | null> {
    if (username === 'admin' && password === 'admin') {
      const user: User = {
        id: 1,
        username: 'admin',
        token: 'fake-access-token',
        role: 'admin'
      };

      const menu: MenuItem[] = [
        {
          id: 'home',
          label: 'sidebar.home',
          path: '/home',
          icon: 'fas fa-home'
        },
        {
          id: 'management',
          label: 'sidebar.management',
          icon: 'fas fa-cogs',
          children: [
            {
              id: 'user',
              label: 'sidebar.user',
              path: '/users',
              icon: 'fas fa-user'
            },
            {
              id: 'role',
              label: 'sidebar.role',
              path: '/roles',
              icon: 'fas fa-user-shield'
            }
          ]
        },
        {
          id: 'content',
          label: 'sidebar.content',
          icon: 'fas fa-folder',
          children: [
            {
              id: 'posts',
              label: 'sidebar.posts',
              path: '/posts',
              icon: 'fas fa-file-alt'
            },
            {
              id: 'media',
              label: 'sidebar.media',
              path: '/media',
              icon: 'fas fa-photo-video'
            }
          ]
        }
      ];

      return of({
        user,
        accessToken: user.token,
        refreshToken: 'fake-refresh-token',
        menu
      }).pipe(delay(500));
    }

    return of(null).pipe(delay(500));
  }

  refreshToken(): Observable<string> {
    return of('new-fake-access-token').pipe(delay(500));
  }
}
