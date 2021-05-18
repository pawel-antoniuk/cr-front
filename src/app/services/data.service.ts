import { Injectable } from '@angular/core';
import { Task } from './../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestCase } from '../models/test-case';
import { map } from 'rxjs/operators';
import { Solution } from '../models/solution';

const BASE_URL = 'https://localhost:5001/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private post<T>(url: string, obj: T): Observable<any> {
    return this.http.post(`${BASE_URL}/${url}`, obj);
  }

  private get(url: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${url}`);
  }

  private put<T>(url: string, obj: T): Observable<any> {
    return this.http.put(`${BASE_URL}/${url}`, obj);
  }

  private delete<T>(url: string, obj: T): Observable<any> {
    return this.http.delete(`${BASE_URL}/${url}`, obj);
  }

  addTask(task: Task): Observable<any> {
    return this.post('Task/Create', { TaskModel: task }).pipe(
      map((r) => this.getAllTasks())
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.get('Task').pipe(map((r) => r.tasks));
  }

  getTestCasesByTaskId(taskId: string): Observable<TestCase[]> {
    return this.get(`TestCase/byTaskId/${taskId}`).pipe(
      map((r) => r.testCases)
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.put('Task/Update', { TaskModel: task }).pipe(
      map((r) => this.getAllTasks())
    );
  }

  updateTestCase(testCase: TestCase): Observable<any> {
    return this.put('TestCase/Update', { TestCaseModel: testCase });
  }

  addTestCase(testCase: TestCase): Observable<any> {
    return this.post('TestCase/Create', { TestCaseModel: testCase });
  }

  deleteTask(task: Task): Observable<any> {
    return this.delete(`Task/${task.id}`, task);
  }

  deleteTestCase(testCase: TestCase): Observable<any> {
    return this.delete(`TestCase/${testCase.id}`, testCase);
  }

  createSolution(solution: Solution): Observable<any> {
    return this.post('Solution/Create', { SolutionModel: solution });
  }

  runTaskForEveryTestCase(task: Task, solution: Solution): Observable<any> {
    return this.getTestCasesByTaskId(task.id).pipe(map(t => {

    }));
  }

  getAllTestCases() {
    return this.get('TestCase').pipe(map((r) => r.testCases));
  }

  getAllResults() {
    return this.get('Result').pipe(map((r) => r.results));
  }

  getAllSolutions() {
    return this.get('Solution').pipe(map((r) => r.solutions));
  }
}
