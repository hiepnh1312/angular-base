import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-otp-password-dialog',
  standalone: true,
  templateUrl: './otp-password-dialog.component.html',
  styleUrls: ['./otp-password-dialog.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe]
})
export class OtpPasswordDialogComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  submit() {
    console.log('submit')
    const { password, otp } = this.form.value;
    if (password === '123' && otp === '123') {
      this.confirmed.emit();
    } else {
      alert('Mật khẩu hoặc mã OTP sai!');
    }
  }

  cancel() {
    console.log('cancel')
    this.canceled.emit();
  }
}
