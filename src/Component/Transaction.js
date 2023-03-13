import React from "react";

import editImg from "../assets/images/edit.svg";
import deleteImg from "../assets/images/delete.svg";

const Transaction = ({ transaction }) => {
  const { id, name, type, amount } = transaction;
  return (
    <li className={`transaction income ${type === "expense" && "red"} `}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount} </p>
        <button className="link">
          <img className="icon" src={editImg} alt="" />
        </button>
        <button className="link">
          <img className="icon" src={deleteImg} alt="" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
