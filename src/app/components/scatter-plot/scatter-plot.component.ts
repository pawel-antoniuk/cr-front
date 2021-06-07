import { Component, OnInit, ViewChild } from '@angular/core';
import { PlotlyComponent } from 'angular-plotly.js';
import _ from 'lodash';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataService } from 'src/app/services/data.service';
import {
  ComponentOption,
  DashboardItemComponent,
} from '../dashboard-item/dashboard-item.component';

const plotColors = [
  '#00dd00',
  '#ff0000',
  '#00ffff',
  '#008000',
  '#ffb6c1',
  '#f0ffff',
  '#00ffff',
  '#e9967a',
  '#d3d3d3',
  '#006400',
  '#a52a2a',
  '#0000ff',
  '#800080',
  '#556b2f',
  '#800000',
  '#808000',
  '#ff00ff',
  '#f0e68c',
  '#ffa500',
  '#a9a9a9',
  '#4b0082',
  '#008b8b',
  '#00ff00',
  '#9400d3',
  '#000000',
  '#8b0000',
  '#00008b',
  '#000080',
  '#ffffff',
  '#ffffe0',
  '#e0ffff',
  '#ffff00',
  '#800080',
  '#ffc0cb',
  '#c0c0c0',
  '#90ee90',
  '#9932cc',
  '#f5f5dc',
  '#ff00ff',
  '#bdb76b',
  '#8b008b',
  '#ffd700',
  '#ff8c00',
  '#add8e6',
];

type SelectedVariable = {
  variableNames: string[];
  collectionName: string;
  xVariableName: string;
  yVariableName: string;
  zVariableName: string;
  classVariableName: string;
};

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent implements OnInit {
  componentOptions: ComponentOption[] = [
    {
      id: 'add_plot',
      name: 'Add plot',
      iconName: 'scatter_plot',
    },
  ];

  @ViewChild(PlotlyComponent, { static: true })
  plotly: PlotlyComponent;

  collectionNames: string[] = [];

  plots: SelectedVariable[] = [
    {
      variableNames: [],
      collectionName: '',
      xVariableName: '',
      yVariableName: '',
      zVariableName: '',
      classVariableName: '',
    },
  ];

  limit: number = 1000;
  keepAspectRation: boolean = false;
  interpolate: boolean = false;

  public graph: any = {
    layout: {
      width: 800,
      height: 600,
      margin: { l: 60, r: 10, t: 10, b: 40 },
    },
    data: [],
  };

  constructor(
    private dataService: DataService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.collectionNames = this.dataService.getViewNames();
  }

  openComponentOption(dashboardItem: DashboardItemComponent, optionId: string) {
    if (optionId == 'add_plot') {
      this.plots.push({
        variableNames: [],
        collectionName: '',
        xVariableName: '',
        yVariableName: '',
        zVariableName: '',
        classVariableName: '',
      });
    }
  }

  reloadData() {
    if (this.limit <= 0) {
      return;
    }

    this.graph.data = [];

    for (let plotIndex = 0; plotIndex < this.plots.length; ++plotIndex) {
      const plot = this.plots[plotIndex];

      if (!plot.collectionName || !plot.xVariableName || !plot.yVariableName) {
        continue;
      }

      const data = this.dataService
        .getView(plot.collectionName)
        .chain()
        .find()
        .sort((a, b) => a[plot.xVariableName] - b[plot.xVariableName])
        .limit(this.limit);

      let trace = (this.graph.data[plotIndex] = {
        type: 'scattergl',
        mode: this.interpolate ? 'lines' : 'markers',
        marker: {},
      });

      trace['x'] = data.mapReduce(
        (o) => o[plot.xVariableName],
        (a) => a
      );

      trace['y'] = data.mapReduce(
        (o) => o[plot.yVariableName],
        (a) => a
      );

      if (plot.zVariableName) {
        trace['z'] = data.mapReduce(
          (o) => o[plot.zVariableName],
          (a) => a
        );

        trace['type'] = 'scatter3d';
      }

      if (plot.classVariableName) {
        const classValues = data.mapReduce(
          (o) => o[plot.classVariableName],
          (a) => a
        );

        let categoricalValues = {};
        let categoricalIndex = 0;

        classValues.forEach((classValue) => {
          if (!(classValue in categoricalValues)) {
            categoricalValues[classValue] = categoricalIndex;
            categoricalIndex += 1;
          }
        });

        const colorValues = classValues.map(
          (classValue) => plotColors[categoricalValues[classValue]]
        );

        trace['marker']['color'] = colorValues;
        trace['text'] = classValues;
      }
    }

    this.nameTraces();
    this.configureLayout();
    const subheader = this.plots.map((s) => s.collectionName).join(', ');
    this.dashboardService.setSuheader(this, `${subheader}`);
  }

  private nameTraces() {
    const isCommonVariableName = [
      _.union(this.plots.map((s) => s.xVariableName)).length == 1,
      _.union(this.plots.map((s) => s.yVariableName)).length == 1,
      _.union(this.plots.map((s) => s.zVariableName)).length == 1,
      _.union(this.plots.map((s) => s.classVariableName)).length == 1,
    ];
    const isCommonCollectionname =
      _.union(this.plots.map((s) => s.collectionName)).length == 1;

    for (let plotIndex = 0; plotIndex < this.plots.length; ++plotIndex) {
      const plot = this.plots[plotIndex];

      if (plot == undefined) {
        continue;
      }

      const variableNames = [
        plot.xVariableName,
        plot.yVariableName,
        plot.zVariableName,
        plot.classVariableName,
      ].filter(
        (variableName, variableIndex) => !isCommonVariableName[variableIndex]
      );

      if (plotIndex < this.graph.data.length) {
        if (!isCommonCollectionname) {
          this.graph.data[plotIndex]['name'] = `${plot.collectionName}(${variableNames.join(', ')})`;
        } else {
          this.graph.data[plotIndex]['name'] = `${variableNames.join(', ')}`;
        }
      }
    }
  }

  private configureLayout() {
    this.graph.layout = {
      ...this.graph.layout,
      xaxis: {
        title: {
          text: this.plots.map((s) => s.xVariableName).join(', '),
        },
      },
      yaxis: {
        title: {
          text: this.plots.map((s) => s.yVariableName).join(', '),
        },
      },
      zaxis: {
        title: {
          text: this.plots.map((s) => s.zVariableName).join(', '),
        },
      },
      legend: {
        overlaying: 'y',
        orientation: 'h',
        yanchor: 'top',
      },
    };

    if (this.keepAspectRation) {
      this.graph.layout.xaxis['constrain'] = 'domain';
      this.graph.layout.yaxis['scaleanchor'] = 'x';
      this.graph.layout.zaxis['scaleanchor'] = 'x';
      this.graph.layout['scene'] = { aspectmode: 'data' };
    } else {
      delete this.graph.layout.xaxis['constrain'];
      delete this.graph.layout.yaxis['scaleanchor'];
      delete this.graph.layout.zaxis['scaleanchor'];
      delete this.graph.layout['scene'];
    }
  }

  onDatasetSelectionChange(selectedVariable: SelectedVariable) {
    selectedVariable.variableNames = this.dataService.getViewColumns(
      selectedVariable.collectionName
    );
    selectedVariable.xVariableName = '';
    selectedVariable.yVariableName = '';
    selectedVariable.zVariableName = '';
    this.reloadData();
  }
}
