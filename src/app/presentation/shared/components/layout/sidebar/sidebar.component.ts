import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {selectAuthMenu, selectAuthUser} from '../../../../../store/auth/auth.selectors';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class SidebarComponent {
  private store = inject(Store);
  menu$ = this.store.select(selectAuthMenu);
  user$ = this.store.select(selectAuthUser);
}
