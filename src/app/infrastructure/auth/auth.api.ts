import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { MenuItem} from '../../store/auth/auth.state';

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

      const flatMenu: MenuItem[] = [
        { id: 'home', label: 'sidebar.home', path: '/home', icon: 'fas fa-home', parentId: null },

        { id: 'management', label: 'sidebar.management', icon: 'fas fa-cogs', parentId: null },
        { id: 'user', label: 'sidebar.user', path: '/users', icon: 'fas fa-user', parentId: 'management' },
        { id: 'role', label: 'sidebar.role', path: '/roles', icon: 'fas fa-user-shield', parentId: 'management' },

        { id: 'content', label: 'sidebar.content', icon: 'fas fa-folder', parentId: null },
        { id: 'posts', label: 'sidebar.posts', path: '/posts', icon: 'fas fa-file-alt', parentId: 'content' },
        { id: 'media', label: 'sidebar.media', path: '/media', icon: 'fas fa-photo-video', parentId: 'content' }
      ];

      return of({
        user,
        accessToken: user.token,
        refreshToken: 'fake-refresh-token',
        menu: flatMenu
      }).pipe(delay(500));
    }

    return of(null).pipe(delay(500));
  }

  refreshToken(): Observable<string> {
    return of('new-fake-access-token').pipe(delay(500));
  }
}
