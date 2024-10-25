import { Outlet, Link, useLoaderData, json } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
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
// loader code runs on backend. 

// also worth understanding, remix renders this component 
// as HTML in the backend before sending to client. 
// These are server responses, and they come attached with Headers.
// We can add custom headers to this ...

export default function ExpensesLayout() {
  // data returned by useLoaderData() will be serislised by remix
  const expenses = useLoaderData(); // can be used in any component route or otherwise
  console.log("expenses in Expenses: " + JSON.stringify(expenses));

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
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

// remix will call loader if a get request is made in the code

// when there are no expenses it is better to handle it
// in the component to keep it functional.
// If thrown as error here, and trigger a root catch boundary,
// that will eclipse the whole page include main menu!
// export async function loader(params) {
//   const expenses = await getExpenses();
// if(!expenses || expenses.length === 0){
//   throw json(
//     {message: 'Could not find any expense.'},
//     {status: 404, statusText: 'No expenses found'}
//   )
//   }
//   return expenses;
// }

// ALTERNATIVELY ...
// configure a catch boundary right her closer to the issue
// this would generate the error on the page without eclipsing the
// main menu, but will still dissapear the Add Expense button

// Best approach ...
// handle empty expense list inside component
// checking if list is empty

// simplify above code ...
// in order to speed up rendering,
// all nested route are executed in parallel
// in this case /expenses and /expenses/$id
export async function loader({ request }) {
  // validate user session and protect all expense routes 
  // with redirect to auth page in login mode
  // and not activate this loader
  // but loaders in child routes will still execute
  // to avoid that add requireUserSession() there
  const userId = await requireUserSession(request);

  console.log("EXPENSES LOADER");

  const expenses = await getExpenses(userId);
  // this is a proper Response to the request
  return json(expenses, {headers: {
    'Cache-Control': 'max-age=3',
  }, });

  // alternatively just return getExenses
  // which will return the expense object,
  // which Remix will wrap in json() Response
  // return getExpenses(userId);
}

// export for Remix to be aware of this header
export function headers({
  actionHeaders,
  errorHeaders,
  loaderHeaders,
  parentHeaders,
}) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"), // set on _mktgLayout.jsx
  };
}