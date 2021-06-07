import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { min, max } from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { ToNumericalComponent } from '../to-numerical/to-numerical.component';

@Component({
  selector: 'app-discretize',
  templateUrl: './discretize.component.html',
  styleUrls: ['./discretize.component.scss']
})
export class DiscretizeComponent implements OnInit {

  selectedColumnNames: string[] = [];
  selectedViewName: string | undefined;
  bins: number | undefined;
  createNewColumn = false;
  convertToText = false;

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<DiscretizeComponent>) { }

  ngOnInit(): void {
  }

  onAccept() {
    const selectedColumnNames: string[] = this.selectedColumnNames;

    selectedColumnNames.forEach(columnName => {
      const columnValues = this.dataService.getView(this.selectedViewName).chain()
        .where(o => o[columnName] != null)
        .mapReduce(o => o[columnName], a => a);
      const minValue = min(columnValues);
      const maxValue = max(columnValues);

      let targetColumnName;
      if (this.createNewColumn) {
        if (this.convertToText) {
          targetColumnName = `discret(${columnName}, ${this.bins}, text)`;
        } else {
          targetColumnName = `discret(${columnName}, ${this.bins})`;
        }
      } else {
        targetColumnName = columnName;
      }

      if (this.convertToText) {
        let textValues = {};

        let i = 0;
        for (; i <= (maxValue - minValue) / this.bins; ++i) {
          const lowerLimit = i * (maxValue - minValue) / this.bins + minValue;
          const upperLimit = (i + 1) * (maxValue - minValue) / this.bins + minValue;
          textValues[i] = `[${lowerLimit.toFixed(2)}, ${upperLimit.toFixed(2)})`;
        }
        const lowerLimit = i * (maxValue - minValue) / this.bins + minValue;
        const upperLimit = (i + 1) * (maxValue - minValue) / this.bins + minValue;
        textValues[i] = `[${lowerLimit.toFixed(2)}, ${upperLimit.toFixed(2)}]`;

        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[targetColumnName] = textValues[this.discretize(row[columnName], minValue, maxValue)];
        });
      } else {
        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[targetColumnName] = this.discretize(row[columnName], minValue, maxValue);
        });
      }

      if (this.createNewColumn) {
        this.dataService.getViewColumns(this.selectedViewName).push(targetColumnName);
        this.dataService.collectionUpdated(this.selectedViewName);
      }
    });

    const collectionName = this.dataService.getViewNameCollection(this.selectedViewName);
    this.dataService.collectionUpdated(collectionName);
    this.dialogRef.close();
  }

  private discretize(currentValue: number, minValue: number, maxValue: number) {
    return Math.min(Math.floor((currentValue - minValue) / (maxValue - minValue) * (this.bins)), this.bins - 1);
  }

}
