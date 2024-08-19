import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Transaction } from "../types/transaction.type";
import { TransactionsActions } from "./transaction.actions";

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null
};


export const transactionFeature = createFeature({
  name: 'transactions',
  reducer: createReducer(
    initialState,
    on(TransactionsActions.startLoading, (state: TransactionState) => ({
        ...state,
        loading: true,
        error: null,
      })),
    on(TransactionsActions.loadTransactionsSuccess, (state: TransactionState, { transactions }: { transactions: Transaction[] }) => ({
      ...state,
      transactions,
      loading: false,
      error: null
    })),
    on(TransactionsActions.addTransactionSuccess, (state: TransactionState, { transaction }: { transaction: Transaction }) => ({
      ...state,
      transactions: [...state.transactions, transaction],
      loading: false,
      error: null
    })),
    on(TransactionsActions.deleteTransactionSuccess, (state: TransactionState, { id }: { id: string }) => ({
      ...state,
      transactions: state.transactions.filter((item: Transaction) => item.id !== id),
      loading: false,
      error: null
    })),
    on(TransactionsActions.transactionsApiFailure, (state: TransactionState, { error }: { error: string }) => ({
      ...state,
      loading: false,
      error
    })),
  ),
  extraSelectors: ({selectTransactions}) => ({
    selectTransactionsTotalAmount: createSelector(
      selectTransactions,
      (transactions) => transactions.reduce(
        (sum: number, item: Transaction) => item.amount + sum,
        0
      )
    ),
  })
});
