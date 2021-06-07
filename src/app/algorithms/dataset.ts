export class Dataset {
  public data: any[];
  public columnNames: string[];
  public calcs : any;

  constructor(data: any[], columnNames: string[]) {
    this.data = data;
    this.columnNames = columnNames;
    this.calcs = {};
  }
}
