import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    
    constructor(public dialog: MatDialog, private zone: NgZone) { }

    handleError(error: Error) {
        this.zone.run(() =>
            this.openDialog(
                error.message
            )
        );
    }

    openDialog(error: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { error: error }
        });
    }
}