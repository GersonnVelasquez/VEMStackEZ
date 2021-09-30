import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewFilterDialogComponent } from './list-view-filter-dialog.component';

describe('ListViewFilterDialogComponent', () => {
  let component: ListViewFilterDialogComponent;
  let fixture: ComponentFixture<ListViewFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
