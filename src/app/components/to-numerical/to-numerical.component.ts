import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import _ from 'lodash-es';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-to-numerical',
  templateUrl: './to-numerical.component.html',
  styleUrls: ['./to-numerical.component.scss']
})
export class ToNumericalComponent implements OnInit {

  selectedColumnNames: string[] = [];
  selectedViewName: string | undefined;
  createNewColumn = false;
  alphabetically = false;

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<ToNumericalComponent>) { }

  ngOnInit(): void {

  }

  onAccept() {
    const selectedColumnNames: string[] = this.selectedColumnNames;

    selectedColumnNames.forEach(columnName => {
      const catMap = this.getCategoricalMap(columnName);

      if(this.createNewColumn) {
        const newColumnName = `cat(${columnName}${this.alphabetically ? ', alpha' : ''})`;
        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[newColumnName] = catMap[row[columnName]];
        });

        this.dataService.getViewColumns(this.selectedViewName).push(newColumnName);
        this.dataService.collectionUpdated(this.selectedViewName);
      } else {
        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[columnName] = catMap[row[columnName]];
        });
      }
    });

    const collectionName = this.dataService.getViewNameCollection(this.selectedViewName);
    this.dataService.collectionUpdated(collectionName);
    this.dialogRef.close();
  }

  private getCategoricalMap(columnName: string) {
    let categoricalValues: string[] = [];
    let categoricalIndex = 0;

    this.dataService.getView(this.selectedViewName).data.forEach(row => {
      if(!categoricalValues.includes(row[columnName])) {
        categoricalValues.push(row[columnName]);
      }
    })

    if(this.alphabetically) {
      categoricalValues.sort();
    }

    let catMap = _.fromPairs(_.zip(categoricalValues, _.range(0, categoricalValues.length)));

    return catMap;
  }

}
