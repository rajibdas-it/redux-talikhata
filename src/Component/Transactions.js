import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactions/transactionSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  // const { isLoading, isError, transactions, error } = transactions;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let content = null;

  if (transactions.isLoading) content = <p>Loading....</p>;
  if (!transactions.isLoading && transactions.isError)
    content = <p>There was an error occoured</p>;

  if (
    !transactions.isLoading &&
    !transactions.isError &&
    transactions.transactions.length > 0
  ) {
    content = transactions.transactions.map((transaction) => <Transaction />);
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
