import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Solution } from 'src/app/models/solution';
import { RecentSolution } from 'src/app/models/recent-solution';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss'],
})
export class RecentsComponent implements OnInit {
  buildVersion = 'v0.71';
  buildDate = '06.06.2021';

  tasks?: Task[];
  solutions?: RecentSolution[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    combineLatest([
      this.dataService.getAllTasks(),
      this.dataService.getAllSolutions(),
      this.dataService.getAllResults(),
    ]).subscribe(([tasks, solutions, results]) => {
      this.solutions = solutions
        .sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime())
        .map((s) => {
          let filteredResults = results.filter((r) => r.solutionId == s.id);
          return {
            ...s,
            taskName: tasks.find((t) => t.id == s.taskId).name,
            executionTime:
              filteredResults.reduce((t, n) => t + n.executionTime, 0) /
              filteredResults.length,
            memoryUsage:
              filteredResults.reduce((t, n) => t + n.memoryUsage, 0) /
              filteredResults.length,
            correctAnswers: filteredResults.filter(
              (r) => r.outputCorrectness == 'True'
            ).length,
            allAnswers: filteredResults.length,
            solutionName: s.name
          };
        })
        .slice(0, 3);
      this.tasks = tasks
        .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
        .slice(0, 3);
    });
  }
}
