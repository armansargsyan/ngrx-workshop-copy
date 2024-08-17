import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { inject } from "@angular/core";
import { TransactionService } from "../services/transaction.service";
import { TransactionsActions } from "./transaction.actions";

export const loadTransactionsEffect = createEffect(
  (actions$ = inject(Actions), transactionService = inject(TransactionService)) => {
  return actions$.pipe(
    ofType(TransactionsActions.loadTransactions),
    exhaustMap(action => {
      TransactionsActions.startLoading();

      return transactionService.loadTransactions().pipe(
        map(transactions => TransactionsActions.loadTransactionsSuccess({ transactions: transactions })),
        catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
      )
    })
  );
}, { functional: true });

export const addTransactionEffect = createEffect((actions$ = inject(Actions), transactionService = inject(TransactionService)) => {
  return actions$.pipe(
    ofType(TransactionsActions.addTransaction),
    exhaustMap(({ transaction }) => {
      TransactionsActions.startLoading();

      return transactionService.addTransaction(transaction).pipe(
        map(() => TransactionsActions.loadTransactions()),
        catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
      )
    })
  );
}, { functional: true });

export const deleteTransactionEffect = createEffect((actions$ = inject(Actions), transactionService = inject(TransactionService)) => {
  return actions$.pipe(
    ofType(TransactionsActions.deleteTransaction),
    exhaustMap(({ id }) => {
      TransactionsActions.startLoading();

      return transactionService.deleteTransaction(id).pipe(
        map(() => TransactionsActions.deleteTransactionSuccess({ id })),
        catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
      )
    })
  );
}, { functional: true });
