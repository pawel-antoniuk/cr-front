import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'lodash';
import {
  ContextMenuItem,
  ContextMenuService,
} from 'src/app/services/context-menu.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataService } from 'src/app/services/data.service';
import {
  CloneableDashboardItem,
  ComponentOption,
  DashboardItemComponent,
} from '../dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent
  implements OnInit, OnDestroy, CloneableDashboardItem<DataTableComponent> {
  @Input()
  collectionName: string;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  records: any[];
  columns: string[];
  indices: string[];
  dataSource: MatTableDataSource<any>;
  collectionViewNames: string[] = [];
  selectedViewName: string;
  columnContextMenuEntries: ContextMenuItem[] = [
    { id: 'delete_column', name: 'Delete this column', iconName: 'backspace' },
  ];
  cellContextMenuEntries: ContextMenuItem[] = [
    { id: 'delete_row', name: 'Delete this row', iconName: 'backspace' },
  ];

  componentOptions: ComponentOption[] = [
    {
      id: 'duplicate_columns',
      name: 'Duplicate columns only',
      iconName: 'content_copy',
    },
    {
      id: 'insert_row',
      name: 'Insert a row',
      iconName: 'add',
    },
  ];

  constructor(
    private dataService: DataService,
    private dashboardService: DashboardService,
    private contextMenuService: ContextMenuService
  ) {}

  ngOnDestroy(): void {
    this.dataService.removeCollectionHandle(this.collectionName);
  }

  ngOnInit(): void {
    if (!this.selectedViewName) {
      this.selectedViewName = this.dataService.getCollectionViewNames(
        this.collectionName
      )[0];
    }

    // this.dataService.removeCollectionUpdateHandler(this.collectionName, () => {});
    this.dataService.onCollectionUpdate(this.collectionName, () =>
      this.onDataUpdate()
    );

    this.onDataUpdate();
  }

  onDataUpdate() {
    this.columns = this.dataService.getViewColumns(this.selectedViewName);
    this.indices = this.dataService.getViewIndices(this.selectedViewName);
    const data = this.dataService.getViewEntries(this.selectedViewName, -1);

    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.collectionViewNames = this.dataService.getCollectionViewNames(
      this.collectionName
    );
  }

  onCollectionViewSelected() {
    this.onDataUpdate();
  }

  cloneComponent(otherComponentInstance: DataTableComponent) {
    otherComponentInstance.collectionName = this.collectionName;
    otherComponentInstance.selectedViewName = this.selectedViewName;
    this.dataService.addCollectionHandle(this.collectionName);
  }

  saveComponent() {
    const content = this.dataService.getViewaAsCsv(this.selectedViewName);
    var a = document.createElement('a');
    var file = new Blob([content], { type: 'text/csv' });
    a.href = URL.createObjectURL(file);
    a.download = `${this.selectedViewName}.csv`;
    a.click();
  }

  openComponentOption(dashboardItem: DashboardItemComponent, optionId: string) {
    if (optionId == 'duplicate_columns') {
      const newCollectionName = this.dataService.cloneViewIntoCollection(
        this.selectedViewName,
        false
      );
      this.dashboardService.addComponent(
        newCollectionName,
        DataTableComponent,
        (component) => {
          component.instance.collectionName = newCollectionName;
        }
      );
    } else if (optionId == 'insert_row') {
      this.dataService
        .getView(this.selectedViewName)
        .insert(this.columns.reduce((a, b) => ((a[b] = 0), a), {}));
      this.onDataUpdate();
    }
  }

  onViewDelete() {
    const availableViewNames = this.dataService.getCollectionViewNames(
      this.collectionName
    );
    const currentViewNameIndex = availableViewNames.findIndex(
      (v) => v == this.selectedViewName
    );
    let newViewName: string;

    if (currentViewNameIndex > 0) {
      newViewName = availableViewNames[currentViewNameIndex - 1];
    } else {
      newViewName = availableViewNames[currentViewNameIndex + 1];
    }

    const oldSelectedViewName = this.selectedViewName;
    this.selectedViewName = newViewName;
    this.dataService.removeView(oldSelectedViewName);
  }

  onCellClick(event, row, col) {
    const input = document.createElement('input');
    input.style.width = event.target.getBoundingClientRect().width - 10 + 'px';
    input.style.height = 20 + 'px';
    input.style.border = 'none';
    input.value = row[col];
    event.target.innerHTML = '';
    event.target.style.padding = '2px';
    event.target.append(input);
    input.focus();

    input.onblur = () => {
      const newValue = input.value;
      event.target.innerHTML = newValue;
      event.target.style.padding = '';

      const newNumberValue = parseFloat(newValue);
      if (isNaN(newNumberValue)) {
        row[col] = newValue;
      } else {
        row[col] = newNumberValue;
      }
    };
  }

  onColumnContextMenu(event: MouseEvent, col: string) {
    this.contextMenuService.open(
      event,
      this.columnContextMenuEntries,
      (item) => {
        if (item.id == 'delete_column') {
          let columns = this.dataService.getViewColumns(this.selectedViewName);
          _.pull(columns, col);
          this.onDataUpdate();
        }
      }
    );
  }

  onCellContextMenu(event: MouseEvent, row: any, col: string) {
    this.contextMenuService.open(event, this.cellContextMenuEntries, (item) => {
      if (item.id == 'delete_row') {
        this.dataService.getView(this.selectedViewName).remove(row);
        this.onDataUpdate();
      }
    });
  }
}
