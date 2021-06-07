import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Result } from 'src/app/models/result';
import { ResultCombined } from 'src/app/models/result-combined';
import { Solution } from 'src/app/models/solution';
import { Task } from 'src/app/models/task';
import { TestCase } from 'src/app/models/test-case';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataService } from 'src/app/services/data.service';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
})
export class FrontComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private dataLoaderService: DataLoaderService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {}

  loadRecentDataset(collectionName: string) {
    this.dataService.loadSavedCollection(collectionName);
    this.dashboardService.addComponent(
      collectionName,
      DataTableComponent,
      (component) => {
        component.instance.collectionName = collectionName;
      }
    );
  }

  getCollectionNames() {
    return this.dataService.getSavedCollectionNames().sort((a, b) => {
      return (
        this.dataService.getSavedCollectionDate(b).getTime() -
        this.dataService.getSavedCollectionDate(a).getTime()
      );
    });
  }

  getCollectionDate(collectionName: string) {
    const date = this.dataService.getSavedCollectionDate(collectionName);
    return date.toLocaleString('pl');
  }

  loadDataOnly() {
    this.dataService.getAllTasks().subscribe((tasks: Task[]) => {
      this.dataLoaderService.loadFromObject('Tasks', ['id'], tasks, Task);
    });
    this.dataService.getAllResults().subscribe((results: Result[]) => {
      this.dataLoaderService.loadFromObject(
        'Results',
        ['testCaseId', 'solutionId'],
        results,
        Result
      );
    });
    this.dataService.getAllTestCases().subscribe((testCases: TestCase[]) => {
      this.dataLoaderService.loadFromObject(
        'Test Cases',
        ['id'],
        testCases,
        TestCase
      );
    });
    this.dataService.getAllSolutions().subscribe((solutions: Solution[]) => {
      this.dataLoaderService.loadFromObject(
        'Solutions',
        ['id'],
        solutions,
        Solution
      );
    });
  }

  combineAllDatasets() {
    this.dataService.getAllCombinedResults().subscribe((cr) => {
      this.dataLoaderService.loadFromObject(
        'Combined Results',
        ['solutionId', 'testCaseId', 'taskId'],
        cr,
        ResultCombined
      );
    });
  }
}
