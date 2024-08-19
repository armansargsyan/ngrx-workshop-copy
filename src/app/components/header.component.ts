import { Component, inject, Signal } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Store } from "@ngrx/store";
import { transactionFeature } from "../store/transaction.feature";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-header",
  template: `
    <mat-toolbar>
      <span>My Finances</span>

      <ng-container *ngIf="loading(); else amountBlock">
        <mat-spinner diameter="20" class="float-right"></mat-spinner>
      </ng-container>
      <ng-template #amountBlock>
        <span class="float-right">{{ totalAmount() | currency }}</span>
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
  private readonly store = inject(Store);
  totalAmount: Signal<number> = this.store.selectSignal(transactionFeature.selectTransactionsTotalAmount);
  loading: Signal<boolean> = this.store.selectSignal(transactionFeature.selectLoading);
}
