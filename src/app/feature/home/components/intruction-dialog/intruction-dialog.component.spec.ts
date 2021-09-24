import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntructionDialogComponent } from './intruction-dialog.component';

describe('IntructionDialogComponent', () => {
  let component: IntructionDialogComponent;
  let fixture: ComponentFixture<IntructionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntructionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntructionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
