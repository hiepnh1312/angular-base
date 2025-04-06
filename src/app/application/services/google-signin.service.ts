import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleSignInService {
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
}
