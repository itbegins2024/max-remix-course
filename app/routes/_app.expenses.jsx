import { Outlet, Link, useLoaderData, json } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

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

// worth understanding: ExpensesLayout() component code runs on front end
// loader code runs on backend

export default function ExpensesLayout() {
  // data returned by useLoaderData() will be serislised by remix
  const expenses = useLoaderData(); // can be used in any component route or otherwise
  console.log("expenses: " + expenses);

  // console.log("date: " + new Date(expenses[0].date).get); // not working
  console.log("RENDERING EXPENSES LAYOUT ");

  const hasExpenses = expenses && expenses.length > 0;
  return (
    <>
      <Outlet />
      {/* implementing a catch boundary in this route 
      for abscence of expense items 
      will obscure rendering of the ui in <section> */}
      {/* instead handle it inside the UI */}
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
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>

        {/* handle empty expense list */}
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && <section id='no-expenses'>
          <h1>No expenses found</h1>
          <p>Start <Link to='add'>adding some</Link> today.</p>
        </section> }
      </main>
    </>
  );
}

// remix will call loader if a get request is made in the code

// when there are no expenses it is better to handle it 
// in the component. If thrown as error here, 
// trigger a catch boundary, but ...
// it will take over the screen making adding expenses impossible 
// adding a catch boundary here will only marginally solve this
// because the add button is in the component!
// export async function loader(params) {
//   const expenses = await getExpenses();
//   if(!expenses || expenses.length === 0){
//     throw json(
//       {message: 'Could not find any expense.'},
//       {status: 404, statusText: 'No expenses found'}
//     ) 
//   }
//   return expenses;
// }

// simplify above code ...
// in order to speed up rendering, 
// all nested route are executed in parallel
// in this case /expenses and /expenses/$id
export function loader() {
  console.log("EXPENSES LOADER");
  return getExpenses();
}

// alternatively ...
// json() is what remix does in the background anyway ...
// export async function loader() {
//   const expenses = await getExpenses();
//   return json(expenses);
// }

