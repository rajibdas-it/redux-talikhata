import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactions/transactionSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const { isLoading, isError, transactions, error } = useSelector(
    (state) => state.transactions
  );

  let content = null;

  console.log(transactions);

  if (isLoading) content = <p>Loading....</p>;
  if (!isLoading && isError) content = <p>There was an error occoured</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction transaction={transaction} />
    ));
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
