import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { mean } from 'lodash';
import { sampleStandardDeviation } from 'simple-statistics';
import { DataService } from 'src/app/services/data.service';
import { ToNumericalComponent } from '../to-numerical/to-numerical.component';

@Component({
  selector: 'app-normalize',
  templateUrl: './normalize.component.html',
  styleUrls: ['./normalize.component.scss']
})
export class NormalizeComponent implements OnInit {

  selectedColumnNames: string[] = [];
  selectedViewName: string | undefined;
  createNewColumn = false;

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<NormalizeComponent>) { }

  ngOnInit(): void {
  }

  onAccept() {
    const selectedColumnNames: string[] = this.selectedColumnNames;

    selectedColumnNames.forEach(columnName => {
      const columnValues = this.dataService.getView(this.selectedViewName).chain()
        .where(o => o[columnName] != null)
        .mapReduce(o => o[columnName], a => a);
      const meanValue = mean(columnValues);
      const stdValue = sampleStandardDeviation(columnValues);

      if (this.createNewColumn) {
        const newColumnName = `norm(${columnName})`;
        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[newColumnName] = this.normalize(row[columnName], meanValue, stdValue);
        });

        this.dataService.getViewColumns(this.selectedViewName).push(newColumnName);
        this.dataService.collectionUpdated(this.selectedViewName);
      } else {
        this.dataService.getView(this.selectedViewName).data.forEach(row => {
          row[columnName] = this.normalize(row[columnName], meanValue, stdValue);
        });
      }
    });

    const collectionName = this.dataService.getViewNameCollection(this.selectedViewName);
    this.dataService.collectionUpdated(collectionName);
    this.dialogRef.close();
  }

  private normalize(currentValue: number, mean: number, std: number) {
    if (std == 0) {
      return 0;
    } else {
      return (currentValue - mean) / std;
    }
  }

}
