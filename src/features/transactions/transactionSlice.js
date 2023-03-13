import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  success: false,
  error: "",
  editItem: {},
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
    const transaction = await editTransaction(id, data);
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
  reducers: {
    editActive: (state, action) => {
      state.editItem = action.payload;
    },
    editInactive: (state) => {
      state.editItem = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch transactions addcase
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
        state.success = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action?.error?.message;
      })
      //create transaction addcase
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
        state.isError = false;
        state.success = true;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })
      //edit and update transaction addcase
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
        state.success = true;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })
      //remove transactions addcase
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action);
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
        state.success = true;
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
export const { editActive, editInactive } = transactionsSlice.actions;
