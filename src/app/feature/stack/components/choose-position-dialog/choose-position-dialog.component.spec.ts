import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePositionDialogComponent } from './choose-position-dialog.component';

describe('ChoosePositionDialogComponent', () => {
  let component: ChoosePositionDialogComponent;
  let fixture: ComponentFixture<ChoosePositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePositionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
