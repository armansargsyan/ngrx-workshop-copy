import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../types/transaction.type';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);

  loadTransactions() {
    return this.http.get<Transaction[]>('http://localhost:3000/transactions');
  }

  addTransaction(transaction: Transaction) {
    return this.http.post<Transaction>('http://localhost:3000/transactions', transaction);
  }
}
