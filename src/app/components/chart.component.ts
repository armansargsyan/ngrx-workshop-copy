import { Component, effect, ElementRef, inject, Signal, viewChild, } from '@angular/core';
import { Transaction } from '../types/transaction.type';
import Chart from 'chart.js/auto'
import { Store } from "@ngrx/store";
import { transactionFeature, TransactionState } from "../store/transaction.feature";


@Component({
  selector: 'app-transaction-pie-chart',
  template: '<div><canvas #transactionPieChart></canvas></div>',
  standalone: true,
  styles: `
    div {
      width: 600px;
      height: 600px;
      margin: auto;
    }
  `
})
export class TransactionPieChartComponent {
  chartEl = viewChild<ElementRef<HTMLCanvasElement>>('transactionPieChart');
  currentChart?: Chart<'pie'>;
  private readonly store: Store<TransactionState> = inject(Store);
  transactions: Signal<Transaction[]> = this.store.selectSignal(transactionFeature.selectTransactions);

  constructor() {
    effect(() => {
      this.createPieChart(this.transactions());
    });
  }

  createPieChart(transactions: Transaction[]): void {
    const categoryTotals = this.getCategoryTotals(transactions);
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const context = this.chartEl()!.nativeElement.getContext('2d')!;
    this.currentChart?.destroy();
    this.currentChart = new Chart(context, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: this.generateColors(labels.length),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Transaction Categories',
          },
        },
      },
    });
  }

  getCategoryTotals(transactions: Transaction[]): Record<string, number> {
    const totals: Record<string, number> = {};
    transactions.filter((transaction) => transaction.amount < 0).forEach((transaction) => {
      if (totals[transaction.category]) {
        totals[transaction.category] += Math.abs(transaction.amount);
      } else {
        totals[transaction.category] = Math.abs(transaction.amount);
      }
    });
    return totals;
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 180) / count}, 70%, 50%)`);
    }
    return colors;
  }
}
