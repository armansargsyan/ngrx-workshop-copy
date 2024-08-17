import { createSelector } from "@ngrx/store";
import { transactionFeature } from "./transaction.feature";
import { Transaction } from "../types/transaction.type";

export const selectTransactionsTotalAmount = createSelector(
  transactionFeature.selectTransactions,
  (transactions) => transactions.reduce(
    (sum: number, item: Transaction) => item.amount + sum,
    0
  )
)
