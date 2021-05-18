import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { TestCase } from '../../models/test-case';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { combineLatest, forkJoin, merge, of, zip } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('testCaseSelection') testCaseSelection!: MatSelectionList;

  public selctedTask?: Task;
  public selectedTestCase = new TestCase();
  tasks: Task[] = [];
  selectedTasks?: Task[];
  editedTask: Task = new Task();
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thridFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  selectedTaskTestCases: TestCase[] = [];
  selectedTaskTestCasesIsEdited: boolean[] = [];
  taskEditSkipped = false;
  testCaseEditSkipped = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.firstFormGroup = this.formBuilder.group({
      taskCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
    });
    this.thridFormGroup = this.formBuilder.group({
      // nameCtrl: ['', Validators.required],
      // inputCtrl: ['', Validators.required],
      // outputCtrl: ['', Validators.required],
      // taskCasesListCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      // descCtrl: ['', Validators.required],
      // inputCtrl: ['', Validators.required],
      // outputCtrl: ['', Validators.required],
      // taskCasesListCtrl: ['', Validators.required]
    });
    // this.dataService.getTasks().subscribe({
    //   next: tasks => {
    //     this.tasks = tasks;
    //   }
    // })
  }

  onTaskChange() {
    this.stepper.next();
    this.editedTask = Object.assign({}, this.selectedTasks?.[0]);
    this.dataService
      .getTestCasesByTaskId(this.getSelectedTask()!.id)
      .subscribe((testCases) => {
        this.selectedTaskTestCases = testCases;
        this.selectedTaskTestCasesIsEdited = new Array<boolean>(
          this.selectedTaskTestCases.length
        );
      });

    if (
      this.selectedTaskTestCases == null ||
      this.selectedTaskTestCases.length <= 0
    ) {
      console.log('slected task test cases are nulls or empty');
    }
  }

  onTestCaseChange(ev: MatSelectionListChange) {
    this.selectedTestCase = ev.option.value;
    let testCaseIndex = this.selectedTaskTestCases.findIndex(
      (t) => t.id == this.selectedTestCase.id
    );
    this.selectedTaskTestCasesIsEdited[testCaseIndex!] = true;
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }

  skipEditTask() {
    this.taskEditSkipped = true;
    this.secondFormGroup.disable();
    this.stepper.next();
  }

  skipEditTestCases() {
    this.testCaseEditSkipped = true;
    this.thridFormGroup.disable();
    this.stepper.next();
  }

  deleteTask(task: Task) {
    this.dataService.deleteTask(task).subscribe(() => {
      let indx = this.tasks.indexOf(task);
      this.tasks.splice(indx, 1);
    });
  }

  stepperSelectionChanged(event: StepperSelectionEvent) {}

  acceptChanges() {
    if (!this.taskEditSkipped) {
      this.dataService.updateTask(this.editedTask).subscribe(() => {
        window.location.reload();
      });
    }

    if (!this.testCaseEditSkipped) {
      combineLatest(
        this.selectedTaskTestCases.map((t, i) => {
          if (t.id == '(new)') {
            return this.dataService.addTestCase(t);
          } else if (this.selectedTaskTestCasesIsEdited[i]) {
            return this.dataService.updateTestCase(t);
          }
          return of();
        })
      ).subscribe(() => {
        window.location.reload();
      });
    }
  }

  addTestCase() {
    this.selectedTaskTestCases.push({
      id: '(new)',
      taskId: this.editedTask.id,
      input: this.selectedTestCase.input,
      output: this.selectedTestCase.output,
    });
    this.selectedTestCase.input = '';
    this.selectedTestCase.output = '';
  }

  clearSelection() {
    this.testCaseSelection.deselectAll();
    this.selectedTestCase = new TestCase();
  }

  deleteTestCase(testCase: TestCase) {
    this.dataService.deleteTestCase(testCase).subscribe(() => {
      let indx = this.selectedTaskTestCases.indexOf(testCase);
      this.selectedTaskTestCases.splice(indx, 1);
    });
  }
}
