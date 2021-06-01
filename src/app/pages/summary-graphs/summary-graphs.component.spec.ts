import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGraphsComponent } from './summary-graphs.component';

describe('SummaryGraphsComponent', () => {
  let component: SummaryGraphsComponent;
  let fixture: ComponentFixture<SummaryGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
