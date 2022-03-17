import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, question: string): Observable<boolean> {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: new ConfirmDialogData(title, question)
      }
    )
    return dialogRef.afterClosed()
  }
}
