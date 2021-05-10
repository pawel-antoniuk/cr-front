import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../models/task';
import { TestCase } from '../models/test-case';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  public selctedTask?: Task;
  public selectedTestCase = new TestCase();

  constructor() { }

  ngOnInit(): void {
  }

  onTaskChange(task: Task) {
    this.selctedTask = task;
    this.stepper.next();
  }

  onTestCaseChange(ev: MatSelectionListChange) {
    this.selectedTestCase = ev.option.value;
  }

}
