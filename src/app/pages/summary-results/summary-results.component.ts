import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from 'src/app/models/result';
import { ResultCombined } from 'src/app/models/result-combined';
import { Solution } from 'src/app/models/solution';
import { Task } from 'src/app/models/task';
import { TestCase } from 'src/app/models/test-case';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-summary-results',
  templateUrl: './summary-results.component.html',
  styleUrls: ['./summary-results.component.scss']
})
export class SummaryResultsComponent implements OnInit {

  allResults: ResultCombined[] = [];
  filteredResults: ResultCombined[] = [];
  allAvailableColumns = [
    'taskName',
    'taskId',
    'executionTime',
    'memoryUsage',
    'outputCorrectness',
    'language',
    'input',
    'output',
  ];
  humanColumnNames = [
    'Task name',
    'Task id',
    'Execution time [s]',
    'Memory usage [KiB]',
    'Correctness',
    'Language',
    'Input',
    'Output',
  ];
  displayedColumns = ['taskName', 'executionTime', 'memoryUsage'];

  onlyCorrectResults = false;
  maxExecutionTime?: number = undefined;
  maxMemoryUsage?: number = undefined;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource(this.filteredResults);

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe((tasks: Task[]) => {
      this.dataService.getAllTestCases().subscribe((testCases: TestCase[]) => {
        this.dataService.getAllResults().subscribe((results: Result[]) => {
          this.dataService
            .getAllSolutions()
            .subscribe((solutions: Solution[]) => {
              this.allResults = results.map((r) => {
                let tc = this.getTestCaseById(testCases, r.testCaseId);
                let t = this.getTaskById(tasks, tc.taskId);
                let s = this.getSolutionById(solutions, r.solutionId);
                return {
                  code: s.code,
                  executionTime: r.executionTime,
                  input: tc.input,
                  language: s.language,
                  memoryUsage: r.memoryUsage,
                  taskName: t.name,
                  taskId: t.id,
                  output: tc.output,
                  outputCorrectness: r.outputCorrectness,
                };
              });
              this.updateFilter();
            });
        });
      });
    });
  }

  getTaskById(tasks: Task[], taskId: string): Task {
    return tasks.find((t) => t.id == taskId)!;
  }

  getTestCaseById(testCases: TestCase[], testCaseId: string): TestCase {
    return testCases.find((tc) => tc.id == testCaseId)!;
  }

  getSolutionById(solutions: Solution[], solutionId: string): Solution {
    return solutions.find((s) => s.id == solutionId)!;
  }

  updateFilter() {
    this.filteredResults = this.allResults;

    if (this.onlyCorrectResults) {
      this.filteredResults = this.filteredResults.filter(
        (r) => r.outputCorrectness == 'True'
      );
    }

    if(this.maxExecutionTime) {
      this.filteredResults = this.filteredResults.filter(
        (r) => r.executionTime < this.maxExecutionTime!
      );
    }

    if(this.maxMemoryUsage) {
      this.filteredResults = this.filteredResults.filter(
        (r) => r.memoryUsage < this.maxMemoryUsage!
      );
    }

    // this.dataSource = new MatTableDataSource(this.filteredResults);
  }
}
