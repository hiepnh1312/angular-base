import { Injectable } from '@angular/core';
import { MenuItem } from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class MenuService {
  buildMenuTree(flatMenu: MenuItem[]): MenuItem[] {
    const map = new Map<string, MenuItem>();
    const roots: MenuItem[] = [];

    flatMenu.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });

    map.forEach(item => {
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children!.push(item);
        }
      } else {
        roots.push(item);
      }
    });

    return roots;
  }
}
