import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddTransactionComponent } from './add-transaction.component';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TransactionsActions } from "../store/transaction.actions";
import { transactionFeature, TransactionState } from "../store/transaction.feature";
import { Transaction } from "../types/transaction.type";
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-transactions',
  template: `
    <mat-card appearance="outlined">
      <button mat-raised-button (click)="openDialog('expense')">
        Add Expense
      </button>
      <button mat-raised-button (click)="openDialog('income')">
        Add Income
      </button>
      <table mat-table [dataSource]="(transactions$ | async) || []" class="mat-elevation-z8">
        <!-- Decription Column -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.description }}
          </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.amount | currency }}
          </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.date | date }}
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.category }}
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let transaction">
            <button mat-icon-button (click)="delete(transaction.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>
  `,
  styles: `
    mat-card {
        width: 90%;
        margin: auto;
    }
  `,
  standalone: true,
  imports: [MatTableModule, DatePipe, MatCardModule, MatButtonModule, AsyncPipe, CurrencyPipe, MatIcon],
})
export class TransactionsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly store: Store<{ transactions: TransactionState }> = inject(Store);

  transactions$: Observable<Transaction[]> = this.store.select(transactionFeature.selectTransactions);

  displayedColumns: string[] = ['description', 'amount', 'date', 'category', 'actions'];

  constructor() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  openDialog(type: 'expense' | 'income') {
    this.dialog.open(AddTransactionComponent, {
      data: {
        type: type,
      },
    });
  }

  delete(id: string): void {
    this.store.dispatch(TransactionsActions.deleteTransaction({ id }));
  }
}
