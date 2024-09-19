import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList"
import { getExpenses } from "~/data/expenses.sever";

// const DUMMY_EXPENSES = [
//     {
//       id: "e1",
//       title: "First Expense",
//       amount: 12.99,
//       date: new Date().toISOString(),
//     },
//     {
//       id: "e2",
//       title: "Second Expense",
//       amount: 16.99,
//       date: new Date().toISOString(),
//     },
//   ];

export default function ExpensesLayout() {
  // data returned by useLoaderData() will serislised by remix
 const expenses = useLoaderData(); // can be used in any component route or otherwise
  console.log(expenses);

 return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          {/* this being /expenses, "add" becomes /expenses/add  */}
          {/* <Link> is used for calling client routes */}
          {/* in contrast, <a> is used for fetching data from db  */}
          <Link to="add">
          <FaPlus />
          <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
          <FaDownload /><span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

// remix will call this if a get request is made in the code
// export async function loader(params) {
//   const expenses = await getExpenses();
//   return expenses;
// }

// simplyfy above code ...
export function loader(){
  return getExpenses();
}