import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concat, delay, exhaustMap, map, of } from "rxjs";
import { inject } from "@angular/core";
import { TransactionService } from "../services/transaction.service";
import { TransactionsActions } from "./transaction.actions";

export const loadTransactionsEffect = createEffect(
  (actions$ = inject(Actions), transactionService = inject(TransactionService)) =>
    actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      exhaustMap(() => concat(
        of(TransactionsActions.startLoading()),
        transactionService.loadTransactions().pipe(
          delay(300),
          map(transactions => TransactionsActions.loadTransactionsSuccess({ transactions: transactions })),
          catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
        )
      ))
    ), { functional: true });

export const addTransactionEffect = createEffect((actions$ = inject(Actions), transactionService = inject(TransactionService)) =>
  actions$.pipe(
    ofType(TransactionsActions.addTransaction),
    exhaustMap(({ transaction }) => concat(
      of(TransactionsActions.startLoading()),
      transactionService.addTransaction(transaction).pipe(
        delay(300),
        map(() => TransactionsActions.loadTransactions()),
        catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
      )
    ))), { functional: true });

export const deleteTransactionEffect = createEffect((actions$ = inject(Actions), transactionService = inject(TransactionService)) =>
  actions$.pipe(
    ofType(TransactionsActions.deleteTransaction),
    exhaustMap(({ id }) => concat(
      of(TransactionsActions.startLoading()),
      transactionService.deleteTransaction(id).pipe(
        delay(300),
        map(() => TransactionsActions.deleteTransactionSuccess({ id })),
        catchError((error: Error) => of(TransactionsActions.transactionsApiFailure({ error: error.message })))
      )
    ))
  ), { functional: true });
