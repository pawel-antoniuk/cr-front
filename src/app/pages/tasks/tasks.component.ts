import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { DataService } from 'src/app/services/data.service';
import { FormatterService } from 'src/app/services/formatter.service';
import { Task } from '../../models/task';

/*
  constructor(
  public id: string = '',
  public name: string = '',
  public description: string = '',
  public creationDate: Date = new Date(),
  ) {}
}

*/

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  columns = ['name', 'description', 'creationDate'];
  columnNames = ['Task', 'Description', 'Date'];

  constructor(
    private dataService: DataService,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    public formatter: FormatterService
  ) {}

  ngOnInit() {
    this.dataService
      .getAllTasks()
      .subscribe(
        (t) =>
          (this.tasks = t
            .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
            .slice(0, 5))
      );
  }
}
