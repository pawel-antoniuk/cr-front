import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-dataset-and-variables-selector',
  templateUrl: './dataset-and-variables-selector.component.html',
  styleUrls: ['./dataset-and-variables-selector.component.scss']
})
export class DatasetAndVariablesSelectorComponent implements OnInit {
  viewNames: string[] = [];
  columnNames: string[] = [];
  columnNamesControl = new FormControl();

  @Input() titleSelectDataset: string  = 'Select a dataset for this operation';
  @Input() titleSeletVariable: string  = 'Select variables to use in this operation';

  @Input() selectedViewName: string | undefined;
  @Output() selectedViewNameChange = new EventEmitter<string>();
  @Input() selectedColumnNames: string[] = [];
  @Output() selectedColumnNamesChange = new EventEmitter<string[]>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.viewNames = this.dataService.getViewNames();
  }

  onViewNamesSelectionChange() {
    this.columnNames = this.dataService.getViewColumns(this.selectedViewName);
    this.columnNamesControl.setValue(this.columnNames);
    this.selectedViewNameChange.emit(this.selectedViewName);
    this.selectedColumnNamesChange.emit(this.columnNamesControl.value);
  }

  onColumnNamesSelectionChange() {
    this.selectedColumnNamesChange.emit(this.columnNamesControl.value);
  }

}
