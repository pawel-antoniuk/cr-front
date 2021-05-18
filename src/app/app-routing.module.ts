import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { UploadCodeComponent } from './pages/upload-code/upload-code.component';

const routes: Routes = [
  { path: 'upload', component: AppComponent},
  { path: 'add-task', component: AppComponent},
  { path: 'edit-task', component: AppComponent},
  { path: 'summary', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
