import React from "react";
import CurrentBalance from "../Component/CurrentBalance";
import Form from "../Component/Form";
import Transactions from "../Component/Transactions";

const Main = () => {
  return (
    <div className="main">
      <div className="container">
        <CurrentBalance />
        <Form />
        <Transactions />
      </div>
    </div>
  );
};

export default Main;
