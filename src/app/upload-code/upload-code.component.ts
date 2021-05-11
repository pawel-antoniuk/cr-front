import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

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

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      taskCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      codeCtrl: ['', Validators.required],
      langCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({

    });

    this.dataService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      }
    });
  }

  onTaskChange() {
    // console.log(this.selectedTasks?.a);
    this.stepper.next();
  }

  onUpload() {
    this.stepper.next();
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }
}
