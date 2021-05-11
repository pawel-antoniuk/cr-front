import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../models/task';
import { TestCase } from '../models/test-case';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  public selctedTask?: Task;
  public selectedTestCase = new TestCase();
  tasks?: Task[]
  firstFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      taskCtrl: ['', Validators.required],
    });
    this.dataService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
      }
    })
  }

  onTaskChange() {
    this.stepper.next();
  }

  onTestCaseChange(ev: MatSelectionListChange) {
    this.selectedTestCase = ev.option.value;
  }

}
