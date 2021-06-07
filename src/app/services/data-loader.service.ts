import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { HeaderSelectorComponent } from '../components/header-selector/header-selector.component';
import { SelectIndexComponent } from '../components/select-index/select-index.component';
import { DashboardService } from './dashboard.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(
    private data: DataService,
    private dialog: MatDialog,
    private dashboardService: DashboardService) { }

  public loadFile(file: File) {
    this.dialog.open(HeaderSelectorComponent, {

    }).afterClosed().subscribe(importSettings => {
      if (importSettings === undefined) {
        return;
      }

      this.data.loadDataFromFile(file, importSettings, (result) => {
        if (!result.success) {
          this.dialog.open(AlertComponent, {
            data: {
              title: 'Error',
              message: 'Dataset has duplicated column names'
            }
          });
          return;
        }

        this.dialog.open(SelectIndexComponent, {
          data: {
            headers: result.headers,
            proposedIndices: result.proposedIndices
          }
        }).afterClosed().subscribe(indices => {
          if (indices === null || Array.isArray(indices)) {
            result.save(indices, (collectionName) => {
              this.dashboardService.addComponent(collectionName, DataTableComponent, component => {
                component.instance.collectionName = collectionName;
              });
            });
          }
        });
      });
    });
  }

  public loadAsset(url: string, assetName: string) {
    this.dialog.open(HeaderSelectorComponent, {

    }).afterClosed().subscribe(importSettings => {
      if (importSettings === undefined) {
        return;
      }

      this.data.loadDataFromAssets(url, assetName, importSettings,
        (result) => {
          if (!result.success) {
            this.dialog.open(AlertComponent, {
              data: {
                title: 'Error',
                message: 'Dataset has duplicated column names'
              }
            });
            return;
          }

          this.dialog.open(SelectIndexComponent, {
            data: {
              headers: result.headers,
              proposedIndices: result.proposedIndices
            }
          }).afterClosed().subscribe(indices => {
            if (indices === null || Array.isArray(indices)) {
              result.save(indices, (collectionName) => {
                this.dashboardService.addComponent(collectionName, DataTableComponent, component => {
                  component.instance.collectionName = collectionName;
                });
              });
            }
          });
        });
    });
  }

  public loadFromObject(datasetName, indexes: string[], obj: any[], type: any) {
    let header = Object.keys(new type());
    console.log(new type());

    this.data.addCollectionEntry(datasetName, obj, header, false, (result) => {
      result.save(indexes, (collectionName) => {
        this.dashboardService.addComponent(collectionName, DataTableComponent, component => {
          component.instance.collectionName = collectionName;
        });
      });
    });
  }

}
