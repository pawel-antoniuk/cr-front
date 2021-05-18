import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Result } from 'src/app/models/result';
import { ResultCombined } from 'src/app/models/result-combined';
import { Solution } from 'src/app/models/solution';
import { Task } from 'src/app/models/task';
import { TestCase } from 'src/app/models/test-case';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  results: ResultCombined[] = [];
  displayedColumns = ['executionTime', 'memoryUsage', 'outputCorrectness',
    'language', 'name', 'input', 'output'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe((tasks: Task[]) => {
      this.dataService.getAllTestCases().subscribe((testCases: TestCase[]) => {
        this.dataService.getAllResults().subscribe((results: Result[]) => {
          this.dataService
            .getAllSolutions()
            .subscribe((solutions: Solution[]) => {
              this.results = results.map((r) => {
                let tc = this.getTestCaseById(testCases, r.testCaseId);
                let t = this.getTaskById(tasks, tc.taskId);
                let s = this.getSolutionById(solutions, r.solutionId);
                return {
                  code: s.code,
                  executionTime: r.executionTime,
                  input: tc.input,
                  language: s.language,
                  memoryUsage: r.memoryUsage,
                  name: t.name,
                  output: tc.output,
                  outputCorrectness: r.outputCorrectness,
                };
              });
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
}
