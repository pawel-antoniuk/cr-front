import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { RecentSolution } from 'src/app/models/recent-solution';
import { DataService } from 'src/app/services/data.service';
import { FormatterService } from 'src/app/services/formatter.service';

class SolutionDisplay {
  solutionName: string;
  taskName: string;
  performance: string;
  language: string;
  corectness: string;
  creationDate: Date;
}

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public formatter: FormatterService
  ) {}

  solutions?: SolutionDisplay[];
  columns = ['solutionName', 'taskName', 'performance', 'creationDate'];
  columnNames = ['Solution', 'Task', 'Performance', 'Date'];

  ngOnInit(): void {
    combineLatest([
      this.dataService.getAllTasks(),
      this.dataService.getAllSolutions(),
      this.dataService.getAllResults(),
    ]).subscribe(([tasks, solutions, results]) => {
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
          return {
            solutionName: `${this.formatter.format(s.name)} (${s.language})`,
            taskName: tasks.find((t) => t.id == s.taskId).name,
            performance: `${this.formatter.format(executionTime)} s /
            ${this.formatter.format(memoryUsage)} KiB`,
            language: s.language,
            corectness: `${corectness} / ${filteredResults.length}`,
            creationDate: s.creationDate,
          };
        })
        .slice(0, 5);
    });
  }
}
