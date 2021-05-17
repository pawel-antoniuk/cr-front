import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solution } from 'src/app/models/solution';

@Component({
  selector: 'app-upload-code',
  templateUrl: './upload-code.component.html',
  styleUrls: ['./upload-code.component.scss']
})
export class UploadCodeComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  tasks?: Task[];
  selectedTasks?: Task[];
  response: any;
  status: any;
  solution: Solution = new Solution();
  editedTask: Task = new Task();

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
      codeCtrl: ['', Validators.required],
      langCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({

    });

    // this.dataService.getTasks().subscribe({
    //   next: (tasks: Task[]) => {
    //     this.tasks = tasks;
    //   }
    // });
  }

  onTaskChange() {
    this.editedTask = Object.assign({}, this.selectedTasks?.[0]);
    console.log(this.selectedTasks?.[0]);
    this.stepper.next();
  }

  async onUpload() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.stepper.next();
    
    console.log(this.editedTask);
    this.solution.taskId = this.editedTask.id;
    console.log('uploading code');
    console.log(this.solution);

    const body = JSON.stringify({ SolutionModel: this.solution });
    this.http.post<Task>('https://localhost:44359/api/Solution/Create', body, httpOptions)
      .subscribe((response) => {
        console.log('post');
        console.log(response);
          this.status = "Everything is OK!";
      });
      if (this.status = "Everything is OK!") {
        await delay(500);
        window.location.reload();
      }
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
