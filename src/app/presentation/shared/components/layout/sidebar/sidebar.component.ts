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
import { MenuItem } from '../../../../../store/auth/auth.state';

interface MenuFlatNode extends MenuItem {
  level: number;
  expandable: boolean;
}

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

  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level,
    node => node.expandable
  );

  dataSource = new BehaviorSubject<MenuFlatNode[]>([]);

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;

  ngOnInit(): void {
    this.store.select(selectMenu).pipe(
      map(menu => this.flattenMenu(menu || []))
    ).subscribe(data => {
      this.dataSource.next(data);
    });
  }

  private flattenMenu(menu: MenuItem[], level = 0): MenuFlatNode[] {
    return menu.reduce<MenuFlatNode[]>((acc, item) => {
      const flatItem: MenuFlatNode = {
        ...item,
        level,
        expandable: !!item.children?.length
      };
      return [
        ...acc,
        flatItem,
        ...(item.children ? this.flattenMenu(item.children, level + 1) : [])
      ];
    }, []);
  }

  onNodeClick(node: MenuFlatNode): void {
    if (node.expandable) {
      this.treeControl.toggle(node);
    } else if (node.path) {
      this.router.navigate([node.path]);
    }
  }
}
