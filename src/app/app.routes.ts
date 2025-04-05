import { Routes } from '@angular/router';
import {LoginComponent} from './presentation/pages/login/login.component';
import {HomeComponent} from './presentation/pages/home/home.component';
import {authGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './presentation/shared/components/layout/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];
