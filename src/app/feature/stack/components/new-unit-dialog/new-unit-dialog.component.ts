import { Component, OnInit } from '@angular/core';
import { StackService } from '../../shared/services/stack.service';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent implements OnInit {
  unitNumber: string;
 
  constructor(private satckService: StackService) { }

  ngOnInit(): void {
  }


  setNewUnit(): void {

  }

}
