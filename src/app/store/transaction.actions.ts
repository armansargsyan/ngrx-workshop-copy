import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Transaction } from "../types/transaction.type";

export const TransactionsActions = createActionGroup({
  source: "Transaction",
  events: {
    "Start Loading": emptyProps(),
    "Load Transactions": emptyProps(),
    "Load Transactions Success": props<{ transactions: Transaction[] }>(),
    "Add Transaction": props<{ transaction: Transaction }>(),
    "Add Transaction Success": props<{ transaction: Transaction }>(),
    "Delete Transaction": props<{ id: string }>(),
    "Delete Transaction Success": props<{ id: string }>(),
    "Transactions Api Failure": props<{ error: string }>()
  }
});
