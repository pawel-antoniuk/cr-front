import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solution } from 'src/app/models/solution';
import { TestCase } from 'src/app/models/test-case';

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
  solution: Solution = new Solution();

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks
    });

    this.firstFormGroup = this.formBuilder.group({
      taskCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      codeCtrl: ['', Validators.required],
      langCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({

    });
  }

  onTaskChange() {
    this.stepper.next();
  }

  async onUpload() {
    this.stepper.next();
    this.solution.taskId = this.selectedTasks![0].id;
    this.dataService.createSolution(this.solution).subscribe(() => window.location.reload())
  }

  getSelectedTask(): Task | undefined {
    return this.selectedTasks?.[0];
  }
}

