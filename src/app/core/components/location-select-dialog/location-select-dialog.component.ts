import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAccessLocation } from '../../models/user.model';

@Component({
  selector: 'app-location-select-dialog',
  templateUrl: './location-select-dialog.component.html',
  styleUrls: ['./location-select-dialog.component.scss']
})
export class LocationSelectDialogComponent implements OnInit {
  userLocations: UserAccessLocation[] = [];
  locationForm: FormGroup;
  userLocation = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<LocationSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserAccessLocation[],) {
    this.userLocations = data;
  }

  ngOnInit(): void {
    this.locationForm = new FormGroup({
      userLocation: this.userLocation
    });
  }

  selectLocation(): void {
    this.dialogRef.close(this.userLocation.value);
    this.locationForm.reset();
  }
}
