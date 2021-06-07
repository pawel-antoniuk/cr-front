import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataService } from 'src/app/services/data.service';
import { SplitByComponent } from '../split-by/split-by.component';

@Component({
  selector: 'app-rename-categories',
  templateUrl: './rename-categories.component.html',
  styleUrls: ['./rename-categories.component.scss']
})
export class RenameCategoriesComponent implements OnInit {

  viewNames: string[] = [];
  variableNames: string[] = [];
  selectedViewName: string;
  selectedVariableName: string;
  categories: { [id: string]: { name: string } } = {};

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<SplitByComponent>,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.viewNames = this.dataService.getViewNames();
    this.selectedViewName = '';
  }

  onDatasetSelectionChange() {
    this.variableNames = this.dataService.getViewColumns(this.selectedViewName);
  }

  onVariableSelectionChange() {
    this.categories = {};
    if (this.selectedVariableName) {
      this.dataService.getView(this.selectedViewName).data
        .forEach(o => this.categories[o[this.selectedVariableName]] = { name: o[this.selectedVariableName]?.toString() });
    }
  }

  onAccept() {
    this.dataService.getView(this.selectedViewName).data.forEach(o => {
      o[this.selectedVariableName] = this.categories[o[this.selectedVariableName]].name
    });

    this.dialogRef.close();
  }

}
