import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth/auth.actions';
import { selectAuthError } from '../../../store/auth/auth.selectors';
import {InlineMessageComponent} from '../../shared/components/inline-message/inline-message.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InlineMessageComponent],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  error$ = this.store.select(selectAuthError);

  onSubmit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.store.dispatch(login({ username: username!, password: password! }));
  }
}
