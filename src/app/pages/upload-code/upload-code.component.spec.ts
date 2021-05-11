import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCodeComponent } from './upload-code.component';

describe('UploadCodeComponent', () => {
  let component: UploadCodeComponent;
  let fixture: ComponentFixture<UploadCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
