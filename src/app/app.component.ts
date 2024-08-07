import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from './components/header.component';
import { TransactionsComponent } from './components/transactions.component';
import { TransactionPieChartComponent } from './components/chart.component';

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
}
