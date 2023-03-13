import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../features/transactions/transactionSlice";

const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, editItem } = useSelector(
    (state) => state.transactions
  );
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const data = {
      name,
      type,
      amount,
    };
    dispatch(createTransaction(data));
    reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    reset();
  };

  useEffect(() => {
    const { id, name, type, amount } = editItem;
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editItem]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const id = editItem.id;
    const data = {
      name,
      type,
      amount,
    };
    dispatch(updateTransaction({ id, data }));
    reset();
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form action="" onSubmit={editMode ? handleUpdate : handleAddTransaction}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            value={name}
            name="transaction_name"
            placeholder="My Salary"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              name="transaction_type"
              onClick={(e) => setType("income")}
              checked={type === "income"}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              onClick={(e) => setType("expense")}
              name="transaction_type"
              placeholder="Expense"
              checked={type === "expense"}
              required
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            value={amount}
            placeholder="300"
            name="transaction_amount"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode ? "Update Transactions" : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className="error">There was an error occured</p>
        )}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
