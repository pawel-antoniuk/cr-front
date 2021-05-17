import { Injectable } from '@angular/core';
import { Task } from './../models/task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices blandit aliquam. Donec accumsan, tellus fermentum vehicula eleifend, est est hendrerit felis, in ultrices dolor nisl nec eros. Aliquam erat volutpat. Quisque condimentum mauris at pharetra aliquet. Nulla ultrices ac nisl ac imperdiet. Ut eu ipsum vel libero mattis sodales vitae in arcu. Quisque eu congue est. In vestibulum fringilla luctus. ';
  tasks: Task[] = [
    {
      id: "1",
      name: 'Task 1',
      description: this.defaultDescription,
      // testCases: [
      //   { id: '1', /*name: 't1',*/ input: '1 2 3', output: '3 4 5' },
      //   { id: '2', /*name: 't2',*/ input: '8 9 8', output: '13 6 45' },
      //   { id: '3', /*name: 't3',*/ input: '45 68 98', output: '95 68 45' },
      // ],
    },
    {
      id: "2",
      name: 'Task 2',
      description: this.defaultDescription,
      // testCases: [
      //   { id: '4', /*name: 't4',*/ input: 'ala ma kota', output: 'kot ma ale' },
      //   { id: '5', /*name: 't5',*/ input: 'raz dwa trzy', output: 'trzy dwa raz' },
      //   { id: '6', /*name: 't6',*/ input: 'drzewo las kot', output: 'kot las drzewo' },
      // ],
    },
    {
      id: "3",
      name: 'Task 3',
      description: this.defaultDescription,
      // testCases: [
      //   { id: '7', /*name: 't7',*/ input: '1', output: '2' },
      //   { id: '8', /*name: 't8',*/ input: '2', output: '4' },
      //   { id: '9', /*name: 't9',*/ input: '8', output: '16' },
      // ],
    },
    {
      id: "4",
      name: 'Task 4',
      description: this.defaultDescription,
      // testCases: [
      //   { id: '10', /*name: 't10',*/ input: '3', output: '9' },
      //   { id: '11', /*name: 't11',*/ input: '4', output: '16' },
      //   { id: '12', /*name: 't12',*/ input: '5', output: '25' },
      // ],
    },
    {
      id: "5",
      name: 'Task 5',
      description: this.defaultDescription,
      // testCases: [],
    },
    {
      id: "6",
      name: 'Task 6',
      description: this.defaultDescription,
      // testCases: [],
    },
  ];

  constructor() { }

  getTasks():Observable<Task[]> {
    return of(this.tasks);
  }
}
