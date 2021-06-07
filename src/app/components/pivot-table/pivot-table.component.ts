import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { SplitByComponent } from '../split-by/split-by.component';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss']
})
export class PivotTableComponent implements OnInit {
  selectedViewName: string;
  viewNames: string[] = [];
  columnNames: string[] = [];

  columnNameControl = new FormControl();
  rowNameControl = new FormControl();

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<PivotTableComponent>) { }

  ngOnInit(): void {
    this.viewNames = this.dataService.getViewNames();
  }

  onDatasetSelectionChange() {
    this.columnNames = this.dataService.getViewColumns(this.selectedViewName);
  }

  onAccept() {
    let groups = this.group();

    // const selectedColumnNames: string[] = this.columnNamesControl.value;

    // const fillMethodFunctions = {...FillMethodFunctions, 'constant': (values: number[]) => +this.selectedConstant};
    // selectedColumnNames.forEach(columnName => this.fillValues(columnName, fillMethodFunctions[this.selectedMethodName]));
    // this.dataService.collectionUpdated(this.dataService.getViewNameCollection(this.selectedViewName));

    this.dialogRef.close();
  }

  private group() {
    let groups: { [id: string]: { [id: string]:any[]} } = {};

    this.dataService.getView(this.selectedViewName).data.forEach(o => {
      if (!(o[this.columnNameControl.value] in groups)) {
        groups[o[this.columnNameControl.value]] = {};
      }
      if (!(o[this.rowNameControl.value] in groups[o[this.columnNameControl.value]])) {
        groups[o[this.columnNameControl.value]][o[this.rowNameControl.value]] = [];
      }

      groups[o[this.columnNameControl.value]][o[this.rowNameControl.value]].push(o);
    });

    let allColumnValues = _.keys(groups);
    let allRowValues = _.uniq(_.flatMap(_.values(groups), g => _.keys(g)));
    let aggregated: any[] = new Array<any>(allRowValues.length);
    for(let i = 0; i < aggregated.length; ++i) {
      aggregated[i] = {};
    }

    for(let ci = 0; ci < allColumnValues.length; ++ci) {
      for(let ri = 0; ri < allRowValues.length; ++ri) {
        let val = 0;
        if(allRowValues[ri] in groups[allColumnValues[ci]]) {
          val = groups[allColumnValues[ci]][allRowValues[ri]].length;
        }
        aggregated[ri][allColumnValues[ci]] = val;
        aggregated[ri][this.rowNameControl.value] = allRowValues[ri];
      }
    }

    const collectionName = this.dataService.getViewNameCollection(this.selectedViewName);
    const viewName = `pivot(${this.selectedViewName} by ${this.columnNameControl.value}, ${this.rowNameControl.value})`;
    const colNames = [this.rowNameControl.value, ...allColumnValues];

    this.dataService.addCollectionView(collectionName, viewName, colNames, [], aggregated);
    this.dataService.collectionUpdated(collectionName);

    return groups;
  }

}
