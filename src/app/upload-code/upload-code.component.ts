import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../models/task';

@Component({
  selector: 'app-upload-code',
  templateUrl: './upload-code.component.html',
  styleUrls: ['./upload-code.component.scss']
})
export class UploadCodeComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  constructor() { }

  ngOnInit(): void {
  }

  onTaskChange(task: Task) {
    console.log(task);
    this.stepper.next();
  }

  onUpload() {
    this.stepper.next();
  }
}
