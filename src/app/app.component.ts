import { Component, effect, inject, Signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from './components/header.component';
import { TransactionsComponent } from './components/transactions.component';
import { TransactionPieChartComponent } from './components/chart.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { transactionFeature, TransactionState } from "./store/transaction.feature";
import { ErrorDialogComponent } from "./components/error-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTabsModule,
    TransactionsComponent,
    TransactionPieChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-workshop';
  private readonly dialog = inject(MatDialog);
  private readonly store: Store<{ transactions: TransactionState }> = inject(Store);

  error: Signal<string | null> = this.store.selectSignal(transactionFeature.selectError);
  errorDialogRef?: MatDialogRef<ErrorDialogComponent>;

  constructor() {
    effect(() => {
      const errorMessage = this.error();
      if (errorMessage) {
        this.openErrorDialog(errorMessage);
      } else {
        this.errorDialogRef?.close();
      }
    })
  }

  openErrorDialog(message: string): void {
    this.errorDialogRef?.close();
    this.errorDialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { message },
    });
  }
}
