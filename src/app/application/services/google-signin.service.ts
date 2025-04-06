import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleSignInService {
  initGoogleSignIn(buttonId: string, callback: (res: any) => void) {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback,
    });

    google.accounts.id.renderButton(
      document.getElementById(buttonId),
      { theme: 'outline', size: 'large', width: '100%' }
    );

    google.accounts.id.prompt(); // Hiển thị one-tap nếu bạn muốn
  }
}
