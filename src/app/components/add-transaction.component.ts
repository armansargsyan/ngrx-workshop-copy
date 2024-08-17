import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Transaction } from '../types/transaction.type';
import { Store } from "@ngrx/store";
import { TransactionsActions } from "../store/transaction.actions";
import { TransactionState } from "../store/transaction.feature";

@Component({
  selector: 'app-add-transaction',
  template: `
  <h2 mat-dialog-title>Add {{ dialogData.type | titlecase }}</h2>
    <mat-dialog-content>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Description</mat-label>
          <input
            #description
            matInput
            type="text"
            name="description"
            required
            [(ngModel)]="transaction.description"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Amount</mat-label>
          <input
            #amount
            matInput
            type="number"
            name="amount"
            required
            [(ngModel)]="transaction.amount"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Category</mat-label>
          <input
            #category
            matInput
            type="text"
            name="category"
            required
            [(ngModel)]="transaction.category"
          />
        </mat-form-field>
        <button mat-raised-button type="submit">Add Transaction</button>
      </form>
    </mat-dialog-content>
  `,
  styles: ``,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    TitleCasePipe,
  ],
})
export class AddTransactionComponent {
  public readonly dialogData = inject(MAT_DIALOG_DATA) as {
    type: 'expense' | 'income';
  };
  private readonly dialogRef = inject(MatDialogRef<AddTransactionComponent>);

  private readonly store: Store<{ transactions: TransactionState }> = inject(Store);

  transaction: Transaction = {
    id: '',
    date: new Date(),
    description: '',
    amount: 0,
    category: '',
  };

  onSubmit() {
    const transaction: Transaction = {
      id: Math.random().toString(),
      date: this.transaction.date,
      description: this.transaction.description,
      amount:
        this.dialogData.type === 'expense'
          ? -this.transaction.amount
          : this.transaction.amount,
      category: this.transaction.category,
    };
    this.store.dispatch(TransactionsActions.addTransaction({ transaction }));
    this.dialogRef.close();
  }
}
