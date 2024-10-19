import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import {
  isRouteErrorResponse,
  json,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getExpenses } from "~/data/expenses.server";
import ErrorPage from "~/components/util/Error";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e2",
//     title: "Second Expense",
//     amount: 16.99,
//     date: new Date().toISOString(),
//   },
// ];

// notice this route does not require expenses list in layout,
// therefore does not include .expenses in its route path
// but it does enjoy the layout from _app.jsx, which is routeless

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  console.log("expenses in Analyse: " + JSON.stringify(expenses));

  const hasExpenses = expenses && expenses.length > 0;
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

// data loaded in expenses r'oute is not available here,
// since this is a sibling route, not a child
export async function loader() {
  console.log("EXPENSES LOADER in Analyse");
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json({
      message: "Could not load expenses for the requested analysis.",
      status: 404,
      statustext: "Expenses not found",
    });
  }
  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    // error with status, status.text and message
    // : no status, no status text  : nothing, unknown
    <div>
      {isRouteErrorResponse(error) ? (
        <main>
          <ErrorPage>
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>
              {error.data?.message ||
                "Something went wrong, please try again later!"}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </ErrorPage>
        </main>
      ) : error instanceof Error ? (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </div>
  );
}
