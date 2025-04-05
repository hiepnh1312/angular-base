import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../domain/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  login(username: string, password: string): Observable<User | null> {
    if (username === 'admin' && password === 'admin') {
      return of({
        id: 1,
        username: 'admin',
        token: 'fake-access-token',
        role: 'admin'
      }).pipe(delay(500));
    }

    return of(null).pipe(delay(500));
  }

  refreshToken(): Observable<string> {
    return of('new-fake-access-token').pipe(delay(500));
  }
}
