import React from "react";
import { useSelector } from "react-redux";
import capitalize from "../utils/capitalize";
import commaInThousandNum from "../utils/commaInThousandNum";
import inWords from "../utils/inWords";

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
      <p style={{ marginTop: "15px" }}>
        {" "}
        <span style={{ fontWeight: "bold" }}>Inword: </span>
        {/* style={{ textTransform: "capitalize" }} */}
        <span>{capitalize(inWords(currentAmount))}</span>
      </p>
    </div>
  );
};

export default CurrentBalance;
