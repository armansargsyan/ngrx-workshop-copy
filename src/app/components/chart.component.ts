import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    viewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../types/transaction.type';

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
  `,
})
export class TransactionPieChartComponent implements AfterViewInit {
  private readonly transactionService = inject(TransactionService);
  chartEl = viewChild<ElementRef<HTMLCanvasElement>>('transactionPieChart');
  transactions: Transaction[] = [];

  ngAfterViewInit() {
    this.transactionService.loadTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.createPieChart();
    });
  }

  createPieChart() {
    const categoryTotals = this.getCategoryTotals();
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const context = this.chartEl()!.nativeElement.getContext('2d')!;

    new Chart(context, {
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

  getCategoryTotals(): Record<string, number> {
    const totals: Record<string, number> = {};
    this.transactions.filter((transaction) => transaction.amount <0).forEach((transaction) => {
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
