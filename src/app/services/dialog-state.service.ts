import { Injectable } from '@angular/core';
import _ from 'lodash';
import { isArray } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DialogStateService {
  private dialogStates: { [id: string]: any } = {};
  private saveableConstructorNames: string[] = ['Object', 'FormControl'];

  constructor() {}

  saveSelectedAttributes(dialogInstance: any, variableNames: string[]) {
    let state = {};
    for (let variableName of variableNames) {
      state[variableName] = dialogInstance[variableName];
    }
    this.dialogStates[dialogInstance.constructor.name] = state;
  }

  save(dialogInstance: any) {
    let state = {};
    for (let variableName in dialogInstance) {
      if (
        typeof dialogInstance[variableName] === 'object' &&
        !isArray(dialogInstance[variableName]) &&
        !_.includes(
          this.saveableConstructorNames,
          dialogInstance[variableName].constructor.name
        )
      ) {
        continue;
      }
      state[variableName] = dialogInstance[variableName];
    }
    this.dialogStates[dialogInstance.constructor.name] = state;
  }

  restore(dialogInstance: any) {
    let state = this.dialogStates[dialogInstance.constructor.name];
    for (let variableName in state) {
      dialogInstance[variableName] = state[variableName];
    }
  }
}
