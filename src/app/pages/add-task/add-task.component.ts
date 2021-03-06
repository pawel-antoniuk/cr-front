import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { TestCase } from '../../models/test-case';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  // public selctedTask?: Task;
  // public selectedTestCase = new TestCase();
  newTask: Task = new Task();
  // tasks?: Task[]
  firstFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      // taskCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
    });
    // this.dataService.getTasks().subscribe({
    //   next: tasks => {
    //     this.tasks = tasks;
    //   }
    // })
  }

  saveBtn() {
    this.dataService.addTask(this.newTask).subscribe(() => {
      window.location.reload();
    })
  }

  // onTaskChange() {
  //   this.stepper.next();
  //   console.log("XD STEPPER!");
  // }

  // onTestCaseChange(ev: MatSelectionListChange) {
  //   this.selectedTestCase = ev.option.value;
  // }

}
