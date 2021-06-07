import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataService } from 'src/app/services/data.service';
import { ConvertNumberRangeComponent } from '../convert-number-range/convert-number-range.component';
import { CorrelationMatrixComponent } from '../correlation-matrix/correlation-matrix.component';
import { DiscretizeComponent } from '../discretize/discretize.component';
import { FillEmptyValuesComponent } from '../fill-empty-values/fill-empty-values.component';
import { FilterComponent } from '../filter/filter.component';
import { GroupComponent } from '../group/group.component';
import { HistogramComponent } from '../histogram/histogram.component';
import { JoinComponent } from '../join/join.component';
import { NormalizeComponent } from '../normalize/normalize.component';
import { PivotTableComponent } from '../pivot-table/pivot-table.component';
import { RenameCategoriesComponent } from '../rename-categories/rename-categories.component';
import { RenameColumnsComponent } from '../rename-columns/rename-columns.component';
import { SampleDataComponent } from '../sample-data/sample-data.component';
import { ScatterPlotComponent } from '../scatter-plot/scatter-plot.component';
import { ShorteningFloatsComponent } from '../shortening-floats/shortening-floats.component';
import { SplitByComponent } from '../split-by/split-by.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ToNumericalComponent } from '../to-numerical/to-numerical.component';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-analysis-toolbar',
  templateUrl: './analysis-toolbar.component.html',
  styleUrls: ['./analysis-toolbar.component.scss']
})
export class AnalysisToolbarComponent implements OnInit {

  @Output() collectionNamesLoaded = new EventEmitter<string[]>();

  constructor(private data: DataService,
    private dataLoader: DataLoaderService,
    private dialog: MatDialog,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const file = inputNode.files[0];
    this.dataLoader.loadFile(file);
    inputNode.value = '';
  }

  openToNumerical() {
    this.dialog.open(ToNumericalComponent);
  }

  openDiscretize() {
    this.dialog.open(DiscretizeComponent);
  }

  openNormalize() {
    this.dialog.open(NormalizeComponent);
  }

  openConvertRange() {
    this.dialog.open(ConvertNumberRangeComponent);
  }

  openScatterPlot() {
    this.dashboardService.addComponent('Scatter plot', ScatterPlotComponent, () => { });
  }

  openHistogram() {
    this.dashboardService.addComponent('Histogram', HistogramComponent, () => { });
  }

  openCorrelationMatrix()  {
    this.dashboardService.addComponent('Correlation matrix', CorrelationMatrixComponent, () => { });
  }

  openStatistics() {
    this.dashboardService.addComponent('Statistics', StatisticsComponent, () => { });
  }

  openSampleData() {
    this.dialog.open(SampleDataComponent);
  }


  openFilter() {
    this.dialog.open(FilterComponent);
  }

  openSplitBy() {
    this.dialog.open(SplitByComponent);
  }

  openUpdate() {
    this.dialog.open(UpdateComponent);
  }

  openRenameColumns() {
    this.dialog.open(RenameColumnsComponent);
  }

  openJoin() {
    this.dialog.open(JoinComponent);
  }

  openFillEmptyValues() {
    this.dialog.open(FillEmptyValuesComponent);
  }

  openShortenFloats() {
    this.dialog.open(ShorteningFloatsComponent);
  }

  openPivotTable() {
    this.dialog.open(PivotTableComponent);
  }

  openRenameCategories() {
    this.dialog.open(RenameCategoriesComponent);
  }

  openGroup() {
    this.dialog.open(GroupComponent);
  }

}
