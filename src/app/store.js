import { configureStore } from "@reduxjs/toolkit";
import transaction from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transaction,
  },
});
