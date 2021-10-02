import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }
  success(message: string, action: string): void {
    let config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: ['s-bar-success']
    }
    this.snackBar.open(message, action, config);
  }
  fail(message: string, action: string): void {
    let config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: ['s-bar-fail']
    }
    this.snackBar.open(message, action, config);
  }
}
