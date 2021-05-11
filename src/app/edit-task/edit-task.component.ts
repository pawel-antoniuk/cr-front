import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../models/task';
import { TestCase } from '../models/test-case';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

 
  @ViewChild('stepper') stepper!: MatStepper;

  public selctedTask?: Task;
  public selectedTestCase = new TestCase();
  tasks?: Task[]
  selectedTasks?: Task[];
  editedTask: Task = new Task();
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thridFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  selectedTaskTestCases: TestCase[] | undefined;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      taskCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
    });
    this.thridFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      inputCtrl: ['', Validators.required],
      outputCtrl: ['', Validators.required],
      taskCasesListCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
    });
    this.dataService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
      }
    })
  }

  onTaskChange() {
    this.stepper.next();
    this.editedTask = Object.assign({}, this.selectedTasks?.[0]);
    console.log(this.getSelectedTask()?.testCases);
    this.selectedTaskTestCases = this.getSelectedTask()?.testCases;
  }

  onTestCaseChange(ev: MatSelectionListChange) {
    this.selectedTestCase = ev.option.value;
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }

  getSelectedTestCases(): TestCase[] | undefined {
    return this.getSelectedTask()?.testCases;
  }

}
