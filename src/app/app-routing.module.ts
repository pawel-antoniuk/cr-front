import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RecentsComponent } from './pages/recents/recents.component';
import { UploadCodeComponent } from './pages/upload-code/upload-code.component';
import { TasksSolutionsComponent } from './pages/tasks-solutions/tasks-solutions.component';

const routes: Routes = [
  { path: '', redirectTo: '/recents', pathMatch: 'full' },
  { path: 'recents', component: RecentsComponent},
  { path: 'ranking', component: RankingComponent},
  { path: 'tasks-solutions', component: TasksSolutionsComponent},
  { path: 'upload-code', component: UploadCodeComponent},
  { path: 'create-task', component: AddTaskComponent},
  { path: 'edit-task', component: EditTaskComponent},
  { path: 'results', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
