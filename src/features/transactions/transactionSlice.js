import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "/transactions/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const updateTransaction = createAsyncThunk(
  "/transactions/updateTransaction",
  async ({ id, data }) => {
    const transaction = await updateTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action?.error?.message;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.transactions = [];
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
        state.isError = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action?.error?.message;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action?.error?.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.isError = false;
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export default transactionsSlice.reducer;
