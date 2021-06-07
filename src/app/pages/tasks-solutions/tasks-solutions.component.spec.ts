import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSolutionsComponent } from './tasks-solutions.component';

describe('TasksSolutionsComponent', () => {
  let component: TasksSolutionsComponent;
  let fixture: ComponentFixture<TasksSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksSolutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
