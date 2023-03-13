import React from "react";
import { useSelector } from "react-redux";
import commaInThousandNum from "../utils/commaInThousandNum";

const CurrentBalance = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const incomes = transactions
    .filter((t) => t.type === "income")
    .reduce((prev, next) => {
      return prev + next.amount;
    }, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((prev, next) => {
      return prev + next.amount;
    }, 0);
  // const totalIncome = incomes.reduce((prev, next) => {
  //   return prev + next.amount;
  // }, 0);
  // const totalExpense = expenses.reduce((prev, next) => {
  //   return prev + next.amount;
  // }, 0);
  const currentAmount = incomes - expenses;

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{commaInThousandNum(currentAmount)}</span>
      </h3>
    </div>
  );
};

export default CurrentBalance;
