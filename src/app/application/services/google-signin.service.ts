import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleSignInService {
  constructor(private http: HttpClient) {}
  loginWithPopup(callback: (token: string) => void) {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: environment.googleClientId,
      scope: 'email profile openid',
      callback: (response: any) => {
        if (response.access_token) {
          callback(response.access_token);
        }
      }
    });
    client.requestAccessToken();
  }
  getUserInfo(accessToken: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
