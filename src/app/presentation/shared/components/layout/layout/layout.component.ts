import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
})
export class LayoutComponent {}
