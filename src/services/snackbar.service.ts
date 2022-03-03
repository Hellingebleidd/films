import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  errorMessage(message: string) {
    this.snackBar.open(message, "CANCEL", {panelClass: 'redSnack'})
  }

  successMessage(message: string) {
    this.snackBar.open(message, "OK", {panelClass: 'greenSnack'})
  }
}
