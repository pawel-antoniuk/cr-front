import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Solution } from 'src/app/models/solution';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { FormatterService } from 'src/app/services/formatter.service';

class SolutionDisplay {
  id: string;
  taskId: string;
  solutionName: string;
  taskName: string;
  performance: string;
  language: string;
  corectness: string;
  creationDate: Date;
  code: string;
}

@Component({
  selector: 'app-tasks-solutions',
  templateUrl: './tasks-solutions.component.html',
  styleUrls: ['./tasks-solutions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TasksSolutionsComponent implements OnInit {
  tasks: Task[];
  solutions: SolutionDisplay[];

  taskColumns = ['name', 'description', 'creationDate', 'id'];
  taskColumnNames = ['Task', 'Description', 'Date', 'ID'];

  solutionColumns = ['solutionName', 'performance', 'creationDate', 'corectness', 'id'];
  solutionColumnNames = ['Solution', 'Performance', 'Date', 'Corectness', 'ID'];

  expandedTask: any;
  expandedSolution: any;
  isExpansionTaskDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');

  constructor(
    private dataService: DataService,
    public formatter: FormatterService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.dataService.getAllTasks(),
      this.dataService.getAllSolutions(),
      this.dataService.getAllResults(),
    ]).subscribe(([tasks, solutions, results]) => {
      this.tasks = tasks;
      this.solutions = solutions
        .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
        .map((s) => {
          let filteredResults = results.filter((r) => r.solutionId == s.id);
          let executionTime =
            filteredResults.reduce((t, n) => t + n.executionTime, 0) /
            filteredResults.length;
          let memoryUsage =
            filteredResults.reduce((t, n) => t + n.memoryUsage, 0) /
            filteredResults.length;
          let corectness = filteredResults.filter(
            (r) => r.outputCorrectness == 'True'
          ).length;
          let task = tasks.find((t) => t.id == s.taskId);

          return {
            id: s.id,
            taskId: task.id,
            solutionName: `${this.formatter.format(s.name)} (${s.language})`,
            taskName: task.name,
            performance: `${this.formatter.format(executionTime)} s /
            ${this.formatter.format(memoryUsage)} KiB`,
            language: s.language,
            corectness: filteredResults.length ? `${corectness} / ${filteredResults.length}` : '0 / 0',
            creationDate: s.creationDate,
            code: s.code
          };
        })
        .slice(0, 5);
    });
  }

  getTaskSolutions(task: Task) {
    return this.solutions.filter(s => s.taskId == task.id);
  }
}
