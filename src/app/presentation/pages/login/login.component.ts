import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GoogleSignInService } from '../../../application/services/google-signin.service';
import { login, loginWithGoogle } from '../../../store/auth/auth.actions';
import { InlineMessageComponent } from '../../shared/components/inline-message/inline-message.component';
import { TranslatePipe } from '@ngx-translate/core';
import { OtpPasswordDialogComponent } from '../otp-password-dialog/otp-password-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    InlineMessageComponent,
    TranslatePipe,
    OtpPasswordDialogComponent,
    NgIf
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private google = inject(GoogleSignInService);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  showOtp = signal(false);

  // Bấm nút đăng nhập bằng Google → mở OTP
  onClickGoogleLogin() {
    this.showOtp.set(true);
  }

  // Khi xác thực OTP thành công → gọi đăng nhập Google bằng One Tap
  onOtpConfirmed() {
    this.showOtp.set(false);

    this.google.loginWithPopup((accessToken: string) => {
      this.store.dispatch(loginWithGoogle({ credential: accessToken }));
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.store.dispatch(login({
      username: username + '',
      password: password + ''
    }));
  }
}
