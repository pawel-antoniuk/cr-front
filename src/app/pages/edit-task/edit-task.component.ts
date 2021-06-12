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
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';

export class EditableTestCase {
  constructor(
    public id: string = '',
    public taskId: string = '',
    // public name: string,
    public input: string = '',
    public output: string = '',
    public isEdited: boolean = false
  ) {}
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('testCaseSelection') testCaseSelection!: MatSelectionList;

  public selctedTask?: Task;
  public selectedTestCase = new EditableTestCase();
  public toDeleteTestCases: EditableTestCase[] = [];
  public toDeleteTasks: Task[] = [];
  tasks: Task[] = [];
  selectedTasks?: Task[];
  editedTask: Task = new Task();
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thridFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  selectedTaskTestCases: EditableTestCase[] = [];
  taskEditSkipped = false;
  testCaseEditSkipped = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private dialog: MatDialog
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
        this.selectedTaskTestCases = testCases.map((tc) => ({
          ...tc,
          isEdited: false,
        }));
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
    this.selectedTestCase.isEdited = true;
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
    this.toDeleteTasks.push(task);
    this.stepper.next();
    this.stepper.next();
  }

  stepperSelectionChanged(event: StepperSelectionEvent) {}

  acceptChanges() {
    let taskUpdateObservables = !this.taskEditSkipped
      ? [this.dataService.updateTask(this.editedTask)]
      : [];
    let deleteTestCaseObservables = this.toDeleteTestCases.map((tc) =>
      this.dataService.deleteTestCase(tc)
    );
    let deleteTaskObservables = this.toDeleteTasks.map((t) =>
      this.dataService.deleteTask(t)
    );
    let updateTestCaseObservables = this.selectedTaskTestCases.map((t, i) => {
      if (t.id == '(new)') {
        return this.dataService.addTestCase(t);
      } else if (t.isEdited) {
        return this.dataService.updateTestCase(t);
      }
      return null;
    }).filter(t => t != null);

    let observables = [
      ...updateTestCaseObservables,
      ...deleteTestCaseObservables,
      ...taskUpdateObservables,
      ...deleteTaskObservables,
    ];

    console.log(observables);

    combineLatest(observables).subscribe(() => {
      this.dialog
        .open(AlertComponent, {
          data: {
            title: 'Success',
            message: 'The action was successful',
          },
        })
        .afterClosed()
        .subscribe(() => window.location.reload());
    });
  }

  addTestCase() {
    this.selectedTaskTestCases.push({
      id: '(new)',
      taskId: this.editedTask.id,
      input: this.selectedTestCase.input,
      output: this.selectedTestCase.output,
      isEdited: true
    });
    this.selectedTestCase.input = '';
    this.selectedTestCase.output = '';
  }

  clearSelection() {
    this.testCaseSelection.deselectAll();
    this.selectedTestCase = new EditableTestCase();
  }

  deleteTestCase(testCase: EditableTestCase) {
    this.selectedTaskTestCases.splice(
      this.selectedTaskTestCases.indexOf(testCase),
      1
    );
    this.toDeleteTestCases.push(testCase);
    this.selectedTestCase = new EditableTestCase();
    this.clearSelection();
  }
}
