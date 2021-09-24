import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostUnitDialogComponent } from './lost-unit-dialog.component';

describe('LostUnitDialogComponent', () => {
  let component: LostUnitDialogComponent;
  let fixture: ComponentFixture<LostUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostUnitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
