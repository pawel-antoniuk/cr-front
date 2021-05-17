import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { TestCase } from '../../models/test-case';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatSelectionListChange } from '@angular/material/list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  response: any;
  status: any;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:44359/api/Task')
      .subscribe((response) => {
        this.response = response;
        this.tasks = this.response.tasks;
        console.log(this.tasks);
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
      inputCtrl: ['', Validators.required],
      outputCtrl: ['', Validators.required],
      taskCasesListCtrl: ['', Validators.required]
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
    console.log(this.editedTask);
    console.log(this.getSelectedTask()?.id);
    this.http.get('https://localhost:44359/api/TestCase/byTaskId/' + this.getSelectedTask()?.id)
      .subscribe((response) => {
        this.response = response;
        this.selectedTaskTestCases = this.response.testCases;
        console.log(this.selectedTaskTestCases);
        // console.log(this.selectedTasks?.[0].testCases);
      });

    // this.stepper.next();
    // this.editedTask = Object.assign({}, this.selectedTasks?.[0]);
    // console.log(this.getSelectedTask()?.testCases);
    // this.selectedTaskTestCases = this.getSelectedTask()?.testCases;
  }

  onTestCaseChange(ev: MatSelectionListChange) {
    this.selectedTestCase = ev.option.value;
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }

  // getSelectedTestCases(): TestCase[] | undefined {
  //   return this.getSelectedTask()?.testCases;
  // }

  lastStep() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const bodyTask = JSON.stringify({ TaskModel: this.editedTask });
    console.log(bodyTask);
    this.http.put<Task>('https://localhost:44359/api/Task/Update', bodyTask, httpOptions)
      .subscribe((response) => {
        console.log('put');
        console.log(response);
      });

    if (this.selectedTaskTestCases) {
      this.selectedTaskTestCases.forEach(element => {

        const body = JSON.stringify({ TestCaseModel: element });
        console.log(body);
        this.http.put<TestCase>('https://localhost:44359/api/TestCase/Update', body, httpOptions)
          .subscribe(response => {
            console.log('put');
            console.log(response);
            this.status = "Everything is OK!";
          });
      });
    }
  }

}
