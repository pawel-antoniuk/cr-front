import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './pages/summary/summary.component';
import { UploadCodeComponent } from './pages/upload-code/upload-code.component';

const routes: Routes = [
  { path: 'upload', component: UploadCodeComponent},
  { path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
