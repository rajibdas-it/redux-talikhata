import React from "react";

import editImg from "../assets/images/edit.svg";
import deleteImg from "../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../features/transactions/transactionSlice";
import commaInThousandNum from "../utils/commaInThousandNum";

const Transaction = ({ transaction }) => {
  const { id, name, type, amount } = transaction || {};

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };
  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };
  return (
    <li className={`transaction ${type} `}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {commaInThousandNum(amount)} </p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={editImg} alt="" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImg} alt="" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
