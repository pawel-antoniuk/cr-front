import { DecimalPipe, DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatterService {
  constructor(private decimalPipe: DecimalPipe, private datePipe: DatePipe) {}

  format(obj: any) {
    if (typeof obj == 'string') {
      return obj;
    } else if (obj == null || isNaN(obj)) {
      return '(unknown)';
    } else if (typeof obj == 'number') {
      return this.decimalPipe.transform(obj, '.2');
    } else if (obj instanceof Date) {
      return this.datePipe.transform(obj, 'HH:mm  yyyy/MM/dd');
    } else {
      return obj;
    }
  }
}
