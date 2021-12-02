import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionOutboudModalComponent } from './instruction-outboud-modal.component';

describe('InstructionOutboudModalComponent', () => {
  let component: InstructionOutboudModalComponent;
  let fixture: ComponentFixture<InstructionOutboudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionOutboudModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionOutboudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
