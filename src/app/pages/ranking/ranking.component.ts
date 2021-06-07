import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { RecentSolution } from 'src/app/models/recent-solution';
import { Solution } from 'src/app/models/solution';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { FormatterService } from 'src/app/services/formatter.service';

class DisplayedTask {
  task: Task;
  numberOfSolutions: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  constructor(private dataService: DataService,
    public formatter: FormatterService) {}

  tasks?: DisplayedTask[];
  numberOfSolutions = [3, 10, 20, 30, 50];
  selectedTask?: Task;
  selectedNumberOfSolutions: number = this.numberOfSolutions[0];
  solutions?: RecentSolution[];

  ngOnInit(): void {
    combineLatest([
      this.dataService.getAllTasks(),
      this.dataService.getAllSolutions(),
    ]).subscribe(([tasks, solutions]) => {
      this.tasks = tasks.map((t) => ({
        task: t,
        numberOfSolutions: solutions.filter((s) => s.taskId == t.id).length,
      })).sort((a, b) => b.numberOfSolutions - a.numberOfSolutions);
      this.selectedTask = this.tasks[0].task;
      this.selectedTaskUpdated();
    });
  }

  selectedTaskUpdated() {
    combineLatest([
      this.dataService.getAllSolutions(),
      this.dataService.getAllResults(),
    ]).subscribe(([solutions, results]) => {
      this.solutions = solutions
        .filter((s) => s.taskId == this.selectedTask.id)
        .map((s) => {
          let filteredResults = results.filter((r) => r.solutionId == s.id);
          return {
            ...s,
            taskName: this.selectedTask.name,
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
            solutionName: s.name,
          };
        })
        .sort((a, b) =>
          b.allAnswers == 0
            ? 0
            : b.correctAnswers / b.allAnswers - a.correctAnswers / a.allAnswers
        )
        .slice(0, this.selectedNumberOfSolutions);
    });
  }
}
