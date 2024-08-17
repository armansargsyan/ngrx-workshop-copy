import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatError } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'error-dialog',
  template: `
    <h2 mat-dialog-title>
      <mat-error>
        Attention !!!
      </mat-error>
      <button mat-icon-button (click)="dialogRef.close()">
        <mat-icon>close</mat-icon>
      </button>
    </h2>
    <mat-dialog-content>
      <mat-error>
        {{ dialogData.message }}
      </mat-error>
    </mat-dialog-content>
    <mat-dialog-actions>
    </mat-dialog-actions>`,
  styles: `
    button {
      float: right;
      margin-top: 15px;
    }
  `,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatError,
    MatIconButton,
    MatIcon
  ],
  standalone: true
})

export class ErrorDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
  readonly dialogData: { message: string } = inject(MAT_DIALOG_DATA)

  constructor() {
    console.log('constructor: ', this.dialogData.message);
  }

}
