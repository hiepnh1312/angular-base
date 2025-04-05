import { Component, inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgIf,
  NgFor,
  AsyncPipe,
  NgClass,
  NgStyle
} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { selectMenu } from '../../../../../store/auth/auth.selectors';
import { MenuItem, MenuFlatNode } from '../../../../../store/auth/auth.state';
import {MenuService} from '../../../../../application/services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CdkTreeModule,
    NgIf,
    NgClass,
    RouterLink,
    RouterLinkActive,
    TranslateModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private store = inject(Store);
  private router = inject(Router);
  private menuService = inject(MenuService);

  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level,
    node => node.expandable
  );

  dataSource = new BehaviorSubject<MenuFlatNode[]>([]);

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;

  ngOnInit(): void {
    this.store.select(selectMenu).subscribe(data => {
      const menu = this.menuService.buildMenuTree(data || [])
      this.dataSource.next(menu);
      this.treeControl.dataNodes = menu;
    });
  }
}
