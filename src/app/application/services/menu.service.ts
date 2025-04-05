import { Injectable } from '@angular/core';
import {MenuFlatNode, MenuItem} from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class MenuService {
  buildMenuTree(flatMenu: MenuItem[], parentId: string | null = null, level = 0): MenuFlatNode[] {
    return flatMenu
      .filter(item => item.parentId === parentId)
      .reduce<MenuFlatNode[]>((acc, item) => {
        const flatNode: MenuFlatNode = {
          id: item.id,
          label: item.label,
          path: item.path,
          icon: item.icon,
          level,
          expandable: flatMenu.some(child => child.parentId === item.id)
        };

        const children = this.buildMenuTree(flatMenu, item.id, level + 1);
        return [...acc, flatNode, ...children];
      }, []);
  }
}
