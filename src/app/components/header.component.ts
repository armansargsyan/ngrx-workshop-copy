import { Component, inject } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Store } from "@ngrx/store";
import { transactionFeature, TransactionState } from "../store/transaction.feature";
import { Observable } from "rxjs";
import { selectTransactionsTotalAmount } from "../store/transaction.selectors";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-header",
  template: `
    <mat-toolbar>
      <span>My Finances</span>

      <ng-container *ngIf="loading$ | async; else amountBlock">
        <mat-spinner diameter="20" class="float-right"></mat-spinner>
      </ng-container>
      <ng-template #amountBlock>
        <span class="float-right">{{ (totalAmount$ | async) | currency }}</span>
      </ng-template>

    </mat-toolbar>
  `,
  styles: `
    .float-right {
      position: absolute;
      right: 16px;
    }
  `,
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, CurrencyPipe, MatProgressSpinner, NgIf],
})
export class HeaderComponent {
  private readonly store: Store<{ transactions: TransactionState }> = inject(Store);
  totalAmount$: Observable<number> = this.store.select(selectTransactionsTotalAmount);
  loading$: Observable<boolean> = this.store.select(transactionFeature.selectLoading);
}
