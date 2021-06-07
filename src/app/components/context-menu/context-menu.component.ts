import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContextMenuItem, ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  items: ContextMenuItem[];
  callback: (item: ContextMenuItem) => void;

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit(): void {
    this.contextMenuService.registerComponent(this);
  }

  onAction(item: ContextMenuItem) {
    this.callback(item);
  }

  open(
    event: MouseEvent,
    items: ContextMenuItem[],
    callback: (item: ContextMenuItem) => void
  ) {
    event.preventDefault();
    this.items = items;
    this.callback = callback;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
