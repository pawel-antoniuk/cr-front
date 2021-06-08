import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Solution } from 'src/app/models/solution';
import { RecentSolution } from 'src/app/models/recent-solution';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss'],
})
export class RecentsComponent implements OnInit {
  layout = {
    width: 500,
    height: 400,
    margin: { l: 45, r: 40, t: 30, b: 100 },
    xaxis: {
      // rangemode: 'tozero',
      tickangle: 0,
      title: {
        text: 'Date',
      },
      type: 'date'
    },
    yaxis: {
      rangemode: 'tozero',
      title: {
      },
    },
  };

  public graph: any = {
    tasksLayout: {
      ...this.layout,
      title:'Tasks',
      yaxis: {
        ...this.layout.yaxis,
        title: {
          ...this.layout.yaxis.title,
          text: 'Number of tasks',
        }
      }
    },

    solutionsLayout: {
      ...this.layout,
      title:'Solutions',
      yaxis: {
        ...this.layout.yaxis,
        title: {
          ...this.layout.yaxis.title,
          text: 'Number of solutions',
        }
      }
    },

    languagePieChartLayout: {
      title: 'Language',
      width: 500,
      height: 400,
      margin: { l: 45, r: 40, t: 30, b: 100 },
    },

    tasksData: [],
    solutionsData: [],
    languagePieChartData: [],
    config: { responsive: true },
  };

  buildVersion = 'v0.71';
  buildDate = '06.06.2021';

  allTasks?: Task[];
  allSolutions?: Solution[];

  tasks?: Task[];
  solutions?: RecentSolution[];

  constructor(private dataService: DataService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    combineLatest([
      this.dataService.getAllTasks(),
      this.dataService.getAllSolutions(),
      this.dataService.getAllResults(),
    ]).subscribe(([tasks, solutions, results]) => {
      this.allTasks = tasks;
      this.allSolutions = solutions;
      this.fillData();

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
            solutionName: s.name,
          };
        })
        .slice(0, 3);

      this.tasks = tasks
        .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
        .slice(0, 3);
    });
  }

  fillData() {
    this.addTaskTrace();
    this.addSolutionsTrace();
    this.addLanguagePieChart();
  }

  addTaskTrace() {
    let tasksTrace = {
      type: 'scattergl',
      mode: 'lines+markers',
      marker: {},
      x: [],
      y: [],
    };

    let tasksByDate = this.allTasks
      .reduce((p, c) => {
        let key = c.creationDate.toDateString();
        return {
          ...p,
          [key]: [...(p[key] || []), c],
        };
      }, {});

    for (let date in tasksByDate) {
      tasksTrace.x.push(new Date(tasksByDate[date][0].creationDate.toDateString()));
      tasksTrace.y.push(tasksByDate[date].length);
    }

    this.graph.tasksData.push(tasksTrace);
  }

  addSolutionsTrace() {
    let solutionsTrace = {
      type: 'scattergl',
      mode: 'lines+markers',
      marker: {},
      x: [],
      y: [],
    };

    let solutionsByDate = this.allSolutions
      .reduce((p, c) => {
        let key = c.creationDate.toDateString();
        return {
          ...p,
          [key]: [...(p[key] || []), c],
        };
      }, {});

    for (let date in solutionsByDate) {
      solutionsTrace.x.push(new Date(solutionsByDate[date][0].creationDate.toDateString()));
      solutionsTrace.y.push(solutionsByDate[date].length);
    }

    this.graph.solutionsData.push(solutionsTrace);
  }

  addLanguagePieChart() {
    let data = {
      type: 'pie',
      values: [],
      labels: [],
    };

    let solutionsByLanguage = this.allSolutions
    .reduce((p, c) => {
      let key = c.language;
      return {
        ...p,
        [key]: [...(p[key] || []), c],
      };
    }, {});

    for (let language in solutionsByLanguage) {
      data.labels.push(language);
      data.values.push(solutionsByLanguage[language].length);
    }

    this.graph.languagePieChartData = [data];
  }
}
