import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatStepper } from '@angular/material/stepper';
import { Task } from '../../models/task';
import { TestCase } from '../../models/test-case';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
   ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      // taskCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
    });
  }

  saveBtn() {
    this.dataService.addTask(this.newTask).subscribe(() => {
      this.dialog.open(AlertComponent, {
        data: {
          title: 'Success',
          message: 'The action was successful'
        }
      }).afterClosed().subscribe(() => window.location.reload());
    })
  }

}
