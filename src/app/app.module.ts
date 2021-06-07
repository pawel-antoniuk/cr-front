import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadCodeComponent } from './pages/upload-code/upload-code.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RecentsComponent } from './pages/recents/recents.component';
import { AlertComponent } from './components/alert/alert.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ConvertNumberRangeComponent } from './components/convert-number-range/convert-number-range.component';
import { CorrelationMatrixComponent } from './components/correlation-matrix/correlation-matrix.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DatasetAndVariablesSelectorComponent } from './components/dataset-and-variables-selector/dataset-and-variables-selector.component';
import { DiscretizeComponent } from './components/discretize/discretize.component';
import { FillEmptyValuesComponent } from './components/fill-empty-values/fill-empty-values.component';
import { FilterComponent } from './components/filter/filter.component';
import { FrontComponent } from './components/front/front.component';
import { GroupComponent } from './components/group/group.component';
import { HeaderSelectorComponent } from './components/header-selector/header-selector.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { JoinComponent } from './components/join/join.component';
import { NormalizeComponent } from './components/normalize/normalize.component';
import { PivotTableComponent } from './components/pivot-table/pivot-table.component';
import { RenameCategoriesComponent } from './components/rename-categories/rename-categories.component';
import { RenameColumnsComponent } from './components/rename-columns/rename-columns.component';
import { SampleDataComponent } from './components/sample-data/sample-data.component';
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';
import { SelectIndexComponent } from './components/select-index/select-index.component';
import { ShorteningFloatsComponent } from './components/shortening-floats/shortening-floats.component';
import { SplitByComponent } from './components/split-by/split-by.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ToNumericalComponent } from './components/to-numerical/to-numerical.component';
import { UpdateComponent } from './components/update/update.component';
// import { PlotlyViaCDNModule } from 'angular-plotly.js';
// import { PlotlyModule } from 'angular-plotly.js';

import * as PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';
import { AnalysisToolbarComponent } from './components/analysis-toolbar/analysis-toolbar.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TasksSolutionsComponent } from './pages/tasks-solutions/tasks-solutions.component';

PlotlyModule.plotlyjs = PlotlyJS;

// PlotlyViaCDNModule.setPlotlyVersion('1.55.2'); // can be `latest` or any version number (i.e.: '1.40.0')
// PlotlyViaCDNModule.setPlotlyBundle('basic'); // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


@NgModule({
  declarations: [
    AppComponent,
    UploadCodeComponent,
    ToolbarComponent,
    AddTaskComponent,
    EditTaskComponent,
    RankingComponent,
    RecentsComponent,
    TasksComponent,
    SolutionsComponent,
    // data analysis
    SelectIndexComponent,
    DataTableComponent,
    AnalysisToolbarComponent,
    ScatterPlotComponent,
    DashboardComponent,
    DashboardItemComponent,
    HistogramComponent,
    StatisticsComponent,
    SplitByComponent,
    UpdateComponent,
    AlertComponent,
    RenameColumnsComponent,
    JoinComponent,
    FillEmptyValuesComponent,
    RenameCategoriesComponent,
    GroupComponent,
    CorrelationMatrixComponent,
    SampleDataComponent,
    FrontComponent,
    ShorteningFloatsComponent,
    FilterComponent,
    HeaderSelectorComponent,
    ToNumericalComponent,
    DiscretizeComponent,
    DatasetAndVariablesSelectorComponent,
    NormalizeComponent,
    ConvertNumberRangeComponent,
    ContextMenuComponent,
    PivotTableComponent,
    TasksSolutionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    OverlayModule,
    DragDropModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    PlotlyModule,
  ],
  providers: [DecimalPipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
