import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import * as AuthActions from '../../../../../store/auth/auth.actions';
import {selectUser} from '../../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private store = inject(Store);
  user$: Observable<any> = this.store.select(selectUser);

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
