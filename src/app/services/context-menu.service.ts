import { Injectable } from '@angular/core';
import { ContextMenuComponent } from '../components/context-menu/context-menu.component';

export interface ContextMenuItem {
  id: string;
  name: string;
  iconName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private contextMenuComponent: ContextMenuComponent;

  constructor() { }

  registerComponent(contextMenuComponent: ContextMenuComponent) {
    this.contextMenuComponent = contextMenuComponent;
  }

  open(event: MouseEvent, items: ContextMenuItem[], callback: (item: ContextMenuItem)=>void) {
    this.contextMenuComponent.open(event, items, callback);
  }
}
