import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  const categories = [
    ...new Set(allTransaction.map((transaction) => transaction.category)),
  ];

  const total = allTransaction.length;
  const IncomeTrans = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const ExpenseTrans = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const IncomePercent = (IncomeTrans.length / total) * 100;
  const ExpensePercent = (ExpenseTrans.length / total) * 100;
  const totalTurn = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurn = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurn = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnPer = (totalIncomeTurn / totalTurn) * 100;
  const totalExpenseTurnPer = (totalExpenseTurn / totalTurn) * 100;

  const saving = IncomeTrans - ExpenseTrans;
  return (
    <div className="" style={{ paddingBottom: "60px" }}>
      <div className="w-full flex flex-row justify-around">
        {/* <div className=""> */}
        <div className="w-1/2 px-5 py-3 pb-5 bg-white m-4 rounded-xl">
          <div className="p-2 text-lg">Total Transactions : {total}</div>
          <div className="p-2">
            <h5 className="text-success">Income : {IncomeTrans.length}</h5>
            <h5 className="text-danger">Expense : {ExpenseTrans.length}</h5>
          </div>
          <div className="flex justify-around">
            <Progress
              type="circle"
              strokeColor={"green"}
              className=""
              percent={IncomePercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor={"red"}
              className=""
              percent={ExpensePercent.toFixed(0)}
            />
          </div>
        </div>
        {/* </div> */}
        {/* <div className=""> */}
        <div className="w-1/2 px-5 py-3 pb-5 bg-white m-4 rounded-xl">
          <div className="p-2 text-lg">
            Total Savings : {totalIncomeTurn - totalExpenseTurn}
          </div>
          <div className="p-2">
            <h5 className="text-success">Income : {totalIncomeTurn}</h5>
            <h5 className="text-danger">Expense : {totalExpenseTurn}</h5>
          </div>
          <div className="flex justify-around">
            <Progress
              type="circle"
              strokeColor={"green"}
              className=""
              percent={totalIncomeTurnPer.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor={"red"}
              className=""
              percent={totalExpenseTurnPer.toFixed(0)}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="w-full flex justify-around">
        <div className="w-1/2 bg-white rounded-xl p-4 m-4">
          <h4 className="p-2 text-lg">Categorywise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="p-2">
                  <div className="">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurn) * 100).toFixed(0)}
                    />
                    {console.log(`Category: ${category}, Amount: ${amount}`)}
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="w-1/2 bg-white p-4 rounded-xl m-4">
          <h4 className="p-2 text-lg">Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="p-2">
                  <div className="">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurn) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
