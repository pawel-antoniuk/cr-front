import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { TasksComponent } from './tasks/tasks.component';
import { UploadCodeComponent } from './upload-code/upload-code.component';

const routes: Routes = [
  { path: '', component: TasksComponent},
  { path: 'upload', component: UploadCodeComponent},
  { path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
