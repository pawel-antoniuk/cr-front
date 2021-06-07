import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisToolbarComponent } from './analysis-toolbar.component';

describe('ToolbarComponent', () => {
  let component: AnalysisToolbarComponent;
  let fixture: ComponentFixture<AnalysisToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
